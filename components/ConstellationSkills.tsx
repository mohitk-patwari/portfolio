import { useEffect, useRef, useState } from "react";
import { animate, createScope, onScroll, stagger } from "animejs";
import CircuitBackground from "./CircuitBackground";
import SectionHeader from "./SectionHeader";

type Node = {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  size: number;
  isHub?: boolean;
};

type Edge = {
  from: string;
  to: string;
};

const nodes: Node[] = [
  { id: "hub-lang", label: "Languages", category: "lang", x: 160, y: 120, size: 18, isHub: true },
  { id: "hub-backend", label: "Backend", category: "backend", x: 460, y: 80, size: 18, isHub: true },
  { id: "hub-db", label: "Databases", category: "db", x: 740, y: 160, size: 18, isHub: true },
  { id: "hub-ml", label: "ML & Data", category: "ml", x: 760, y: 400, size: 18, isHub: true },
  { id: "hub-devops", label: "DevOps", category: "devops", x: 420, y: 460, size: 18, isHub: true },
  { id: "hub-cs", label: "Core CS", category: "cs", x: 130, y: 400, size: 18, isHub: true },
  { id: "java", label: "Java", category: "lang", x: 60, y: 60, size: 11 },
  { id: "python", label: "Python", category: "lang", x: 60, y: 160, size: 11 },
  { id: "js", label: "JavaScript", category: "lang", x: 120, y: 220, size: 10 },
  { id: "ts", label: "TypeScript", category: "lang", x: 220, y: 220, size: 10 },
  { id: "sql", label: "SQL", category: "lang", x: 260, y: 80, size: 9 },
  { id: "c", label: "C", category: "lang", x: 60, y: 260, size: 8 },
  { id: "r", label: "R", category: "lang", x: 240, y: 160, size: 8 },
  { id: "nodejs", label: "Node.js", category: "backend", x: 360, y: 40, size: 11 },
  { id: "express", label: "Express.js", category: "backend", x: 460, y: 160, size: 10 },
  { id: "nextjs", label: "Next.js", category: "backend", x: 560, y: 40, size: 10 },
  { id: "restapi", label: "REST APIs", category: "backend", x: 360, y: 160, size: 9 },
  { id: "mysql", label: "MySQL", category: "db", x: 820, y: 80, size: 10 },
  { id: "postgres", label: "PostgreSQL", category: "db", x: 860, y: 200, size: 10 },
  { id: "mongodb", label: "MongoDB", category: "db", x: 760, y: 260, size: 10 },
  { id: "sklearn", label: "scikit-learn", category: "ml", x: 880, y: 340, size: 10 },
  { id: "pandas", label: "Pandas", category: "ml", x: 880, y: 440, size: 9 },
  { id: "numpy", label: "NumPy", category: "ml", x: 820, y: 500, size: 9 },
  { id: "matplot", label: "Matplotlib", category: "ml", x: 680, y: 500, size: 8 },
  { id: "feateng", label: "Feature Eng.", category: "ml", x: 660, y: 340, size: 8 },
  { id: "suplearn", label: "Supervised ML", category: "ml", x: 740, y: 480, size: 8 },
  { id: "anomaly", label: "Anomaly Detection", category: "ml", x: 880, y: 480, size: 7 },
  { id: "docker", label: "Docker", category: "devops", x: 320, y: 500, size: 10 },
  { id: "git", label: "Git", category: "devops", x: 420, y: 540, size: 10 },
  { id: "linux", label: "Linux", category: "devops", x: 520, y: 500, size: 9 },
  { id: "n8n", label: "n8n", category: "devops", x: 300, y: 420, size: 9 },
  { id: "chatgpt", label: "\u26A1 ChatGPT", category: "devops", x: 360, y: 380, size: 8 },
  { id: "cursor", label: "\u26A1 Cursor", category: "devops", x: 480, y: 380, size: 8 },
  { id: "gemini", label: "\u26A1 Gemini", category: "devops", x: 520, y: 420, size: 7 },
  { id: "dsa", label: "DSA", category: "cs", x: 40, y: 340, size: 11 },
  { id: "dbms", label: "DBMS", category: "cs", x: 40, y: 440, size: 9 },
  { id: "os", label: "OS", category: "cs", x: 140, y: 500, size: 9 },
  { id: "sd", label: "System Design", category: "cs", x: 240, y: 440, size: 10 },
];

const hubBackboneEdges: Edge[] = [
  { from: "hub-lang", to: "hub-backend" },
  { from: "hub-backend", to: "hub-db" },
  { from: "hub-db", to: "hub-ml" },
  { from: "hub-ml", to: "hub-devops" },
  { from: "hub-devops", to: "hub-cs" },
  { from: "hub-cs", to: "hub-lang" },
  { from: "hub-lang", to: "hub-ml" },
  { from: "hub-backend", to: "hub-devops" },
];

const skillToHubEdges: Edge[] = nodes
  .filter((node) => !node.isHub)
  .map((node) => ({ from: node.id, to: `hub-${node.category}` }));

const edges: Edge[] = [...skillToHubEdges, ...hubBackboneEdges];

const categoryColors: Record<string, string> = {
  lang: "#3dd6c8",
  backend: "#e6d44a",
  db: "#3dd6c8",
  ml: "#c9593a",
  devops: "#e6d44a",
  cs: "#3dd6c8",
};

const getCategoryColor = (category: string) => categoryColors[category] ?? "#3dd6c8";

const ConstellationSkills = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  useEffect(() => {
    const scope = createScope({ root: svgRef }).add(() => {
      animate(".edge-hub", {
        opacity: [0, 0.6],
        duration: 800,
        delay: stagger(60),
        ease: "outQuad",
        autoplay: onScroll({ target: svgRef.current, enter: "top 85%", once: true }),
      });

      animate(".edge-skill", {
        opacity: [0, 0.35],
        duration: 600,
        delay: stagger(20),
        ease: "outQuad",
        autoplay: onScroll({ target: svgRef.current, enter: "top 80%", once: true }),
      });

      animate(".node-circle", {
        opacity: [0, 1],
        scale: [0, 1],
        duration: 400,
        delay: stagger(25, { start: 400 }),
        ease: "outBack(1.5)",
        autoplay: onScroll({ target: svgRef.current, enter: "top 80%", once: true }),
      });

      animate(".node-label", {
        opacity: [0, 1],
        duration: 300,
        delay: stagger(20, { start: 700 }),
        ease: "outQuad",
        autoplay: onScroll({ target: svgRef.current, enter: "top 80%", once: true }),
      });

      animate(".hub-ring", {
        scale: [1, 1.3],
        opacity: [0.3, 0],
        duration: 2000,
        delay: stagger(300),
        loop: true,
        ease: "outQuad",
      });
    });

    return () => scope.revert();
  }, []);

  const isEdgeConnectedToHovered = (edge: Edge) =>
    hoveredNode !== null && (edge.from === hoveredNode || edge.to === hoveredNode);

  const activeNodeData = activeNode ? nodeMap.get(activeNode) : undefined;

  return (
    <section id="skills" className="section relative overflow-hidden">
      <CircuitBackground className="opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeader label="// CONSTELLATION.map" heading="Skills" animDelay={0} />

        <div className="mt-3 font-mono text-[10px] text-butter/25">
          NODES: 34 | CONNECTIONS: 48 | RENDER: COMPLETE | v2.0.4
        </div>

        <div className="relative w-full overflow-x-auto mt-10">
          <svg
            ref={svgRef}
            viewBox="0 0 900 560"
            className="w-full min-w-[600px]"
            style={{ height: "auto" }}
          >
            <g className="constellation-edges">
              {edges.map((edge) => {
                const fromNode = nodeMap.get(edge.from);
                const toNode = nodeMap.get(edge.to);
                if (!fromNode || !toNode) {
                  return null;
                }

                const isHubEdge = fromNode.isHub && toNode.isHub;
                const edgeClass = isHubEdge ? "edge-hub" : "edge-skill";
                const edgeStroke = isHubEdge ? "#1e4976" : getCategoryColor(fromNode.category);
                const edgeWidth = isHubEdge ? 1.5 : 0.8;
                const isActiveEdge = isEdgeConnectedToHovered(edge);

                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    className={`${edgeClass} ${isActiveEdge ? "edge-active" : ""}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={edgeStroke}
                    strokeWidth={edgeWidth}
                    opacity={0}
                  />
                );
              })}
            </g>

            <g filter="url(#glow-filter)" opacity="0.3">
              {hubBackboneEdges.map((edge) => {
                const fromNode = nodeMap.get(edge.from);
                const toNode = nodeMap.get(edge.to);
                if (!fromNode || !toNode) {
                  return null;
                }

                return (
                  <line
                    key={`glow-${edge.from}-${edge.to}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#3dd6c8"
                    strokeWidth={4}
                    opacity={0.18}
                  />
                );
              })}
            </g>

            <g className="constellation-nodes">
              {nodes.map((node) => {
                const categoryColor = getCategoryColor(node.category);
                const isHovered = hoveredNode === node.id;

                return (
                  <g
                    key={node.id}
                    className="skill-node"
                    data-id={node.id}
                    data-label={node.label}
                    data-category={node.category}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveNode(node.id)}
                    onMouseEnter={() => {
                      setHoveredNode(node.id);
                      setActiveNode(node.id);
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {node.isHub && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size + 6}
                        fill="none"
                        stroke={categoryColor}
                        strokeWidth={1}
                        opacity={0.3}
                        className="hub-ring"
                      />
                    )}

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size}
                      fill={node.isHub ? `${categoryColor}30` : `${categoryColor}15`}
                      stroke={categoryColor}
                      strokeWidth={node.isHub ? 2 : 1}
                      opacity={0}
                      className="node-circle"
                      style={{
                        transformOrigin: `${node.x}px ${node.y}px`,
                        transformBox: "fill-box",
                        transform: isHovered ? "scale(1.2)" : "scale(1)",
                        transition: "transform 180ms ease, stroke 180ms ease, filter 180ms ease",
                        filter: isHovered ? "brightness(1.35)" : "none",
                      }}
                    />

                    <text
                      x={node.x}
                      y={node.y + node.size + 14}
                      textAnchor="middle"
                      fontSize={node.isHub ? 9 : 7}
                      fill={node.isHub ? categoryColor : "#f0e6c840"}
                      fontFamily="JetBrains Mono, monospace"
                      className="node-label"
                      opacity={0}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>

            <defs>
              <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {activeNodeData && (
          <div className="mt-4 font-mono text-xs text-butter/70 border border-borderline rounded-lg px-4 py-2 bg-royal inline-flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: getCategoryColor(activeNodeData.category) }}
            />
            <span className="text-butter">{activeNodeData.label}</span>
            <span className="text-tealcyber/50">{"\u2192"}</span>
            <span className="text-butter/40">{activeNodeData.category.toUpperCase()}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .edge-active {
          opacity: 0.8 !important;
        }
      `}</style>
    </section>
  );
};

export default ConstellationSkills;
