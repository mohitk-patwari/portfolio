import { motion } from "framer-motion";

interface CharacterIllustrationProps {
  className?: string;
}

const A = "#FF9F1C";   // Industrial Amber
const C = "#00F0FF";   // Cyber Cyan
const D1 = "#1A1A1A";  // Shadow dark
const D2 = "#2D2D2D";  // Shadow mid
const D3 = "#3A3A3A";  // Mid panel
const L = "#39FF14";   // Toxic Lime (sparingly)

const CharacterIllustration = ({ className = "" }: CharacterIllustrationProps) => {
  return (
    <svg
      viewBox="0 0 280 520"
      className={className}
      fill="none"
      aria-label="Cyber-industrial character illustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Entire character floats */}
      <motion.g
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >

        {/* ── HOOD ───────────────────────────────────── */}
        {/* Main hood shape — angular trapezoid */}
        <polygon points="90,20 190,20 210,80 70,80" fill={A} />
        {/* Hood inner shadow */}
        <polygon points="100,28 180,28 196,72 84,72" fill={D1} opacity="0.5" />
        {/* Hood ridge line */}
        <polygon points="136,20 144,20 148,80 132,80" fill={D1} opacity="0.3" />
        {/* Hood side panels */}
        <polygon points="70,80 90,20 78,24 56,82" fill={A} opacity="0.7" />
        <polygon points="210,80 190,20 202,24 224,82" fill={A} opacity="0.7" />
        {/* Face shadow under hood */}
        <ellipse cx="140" cy="72" rx="42" ry="24" fill={D1} />
        {/* Faint eye glow */}
        <ellipse cx="125" cy="68" rx="8" ry="5" fill={C} opacity="0.12" />
        <ellipse cx="155" cy="68" rx="8" ry="5" fill={C} opacity="0.12" />

        {/* Circuit traces on hood — LIME PULSE */}
        <motion.g
          animate={{ opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <polyline points="102,36 108,48 120,44 126,56" stroke={L} strokeWidth="0.8" fill="none" opacity="0.7" />
          <polyline points="158,36 152,48 140,44 134,56" stroke={L} strokeWidth="0.8" fill="none" opacity="0.7" />
          <line x1="108" y1="48" x2="152" y2="48" stroke={L} strokeWidth="0.6" opacity="0.4" />
          <circle cx="120" cy="44" r="1.5" fill={L} opacity="0.8" />
          <circle cx="160" cy="44" r="1.5" fill={L} opacity="0.8" />
        </motion.g>

        {/* ── NECK / COLLAR ──────────────────────────── */}
        <rect x="122" y="80" width="36" height="18" fill={D2} />
        <rect x="118" y="92" width="44" height="10" fill={D3} />

        {/* ── SHOULDERS ──────────────────────────────── */}
        {/* Left shoulder pad */}
        <polygon points="60,98 118,98 114,130 52,128" fill={A} />
        <polygon points="60,98 52,128 44,124 54,96" fill={A} opacity="0.7" />
        <line x1="60" y1="98" x2="52" y2="128" stroke={D1} strokeWidth="1.5" />
        {/* Right shoulder pad */}
        <polygon points="162,98 220,98 228,124 166,130" fill={A} />
        <polygon points="220,98 228,124 236,120 226,96" fill={A} opacity="0.7" />
        <line x1="220" y1="98" x2="228" y2="124" stroke={D1} strokeWidth="1.5" />
        {/* Shoulder bolt details */}
        <circle cx="74" cy="110" r="4" fill={D1} stroke={A} strokeWidth="1" />
        <circle cx="206" cy="110" r="4" fill={D1} stroke={A} strokeWidth="1" />

        {/* ── TORSO / JACKET ─────────────────────────── */}
        {/* Main jacket body */}
        <rect x="86" y="102" width="108" height="160" rx="4" fill={D2} />
        {/* Center seam */}
        <line x1="140" y1="102" x2="140" y2="262" stroke={D1} strokeWidth="2" />
        {/* Chest amber panel strips */}
        <rect x="94" y="110" width="38" height="6" fill={A} opacity="0.5" />
        <rect x="148" y="110" width="38" height="6" fill={A} opacity="0.5" />
        {/* Diagonal strap — left */}
        <polygon points="86,120 120,148 114,152 80,124" fill={D3} />
        <polygon points="86,120 80,124 80,130 88,126" fill={A} opacity="0.4" />
        {/* Diagonal strap — right */}
        <polygon points="194,120 160,148 166,152 200,124" fill={D3} />
        <polygon points="194,120 200,124 200,130 192,126" fill={A} opacity="0.4" />
        {/* Chest circuit panel right side */}
        <rect x="150" y="122" width="34" height="28" rx="2" fill={D1} stroke={D3} strokeWidth="1" />
        <motion.g
          animate={{ opacity: [0.25, 0.75, 0.25] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <line x1="154" y1="128" x2="180" y2="128" stroke={L} strokeWidth="0.7" />
          <line x1="154" y1="133" x2="172" y2="133" stroke={L} strokeWidth="0.7" />
          <line x1="154" y1="138" x2="178" y2="138" stroke={L} strokeWidth="0.7" />
          <circle cx="180" cy="128" r="2" fill={L} />
          <circle cx="172" cy="133" r="2" fill={L} />
        </motion.g>
        {/* Lower jacket panel */}
        <rect x="90" y="200" width="100" height="58" rx="2" fill={D3} />
        <rect x="94" y="206" width="42" height="10" fill={D1} />
        <rect x="144" y="206" width="42" height="10" fill={D1} />
        {/* Belt */}
        <rect x="82" y="256" width="116" height="10" fill={A} opacity="0.8" />
        <rect x="130" y="254" width="20" height="14" fill={D1} stroke={A} strokeWidth="1.5" />

        {/* ── HUMAN LEFT ARM ─────────────────────────── */}
        {/* Upper arm */}
        <rect x="46" y="128" width="38" height="72" rx="6" fill={D2} />
        <rect x="50" y="136" width="30" height="8" fill={D3} />
        {/* Elbow guard */}
        <rect x="44" y="192" width="42" height="14" rx="3" fill={D3} />
        {/* Forearm */}
        <rect x="50" y="204" width="30" height="64" rx="5" fill={D2} />
        {/* Sleeve detail stripe */}
        <rect x="54" y="210" width="22" height="4" fill={D3} />
        <rect x="54" y="220" width="22" height="4" fill={D3} />
        {/* Gloved hand */}
        <rect x="52" y="266" width="28" height="24" rx="4" fill={D1} />
        <rect x="56" y="288" width="6" height="10" rx="2" fill={D2} />
        <rect x="64" y="288" width="6" height="12" rx="2" fill={D2} />
        <rect x="72" y="288" width="6" height="10" rx="2" fill={D2} />

        {/* ── MECHANICAL RIGHT ARM ───────────────────── */}
        {/* Upper arm segment */}
        <rect x="196" y="128" width="44" height="64" rx="4" fill={D1} />
        <rect x="200" y="134" width="36" height="12" fill={D2} />
        <rect x="200" y="150" width="36" height="12" fill={D2} />
        <rect x="200" y="166" width="36" height="12" fill={D2} />
        {/* Shoulder-arm joint detail */}
        <circle cx="218" cy="128" r="8" fill={D2} stroke={A} strokeWidth="1.5" />
        <circle cx="218" cy="128" r="4" fill={D1} />
        {/* Elbow joint */}
        <circle cx="218" cy="196" r="10" fill={D1} stroke={A} strokeWidth="2" />
        <circle cx="218" cy="196" r="5" fill={D2} stroke={C} strokeWidth="1" />
        {/* Forearm — angled, more mechanical */}
        <polygon points="208,206 230,206 234,270 204,270" fill={D1} />
        <rect x="208" y="212" width="22" height="6" fill={D2} />
        <rect x="208" y="224" width="22" height="6" fill={D2} />
        <rect x="208" y="236" width="22" height="6" fill={D2} />
        <rect x="208" y="248" width="22" height="6" fill={D2} />
        {/* Cyan wiring along forearm */}
        <motion.g
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          <line x1="212" y1="210" x2="212" y2="268" stroke={C} strokeWidth="0.8" opacity="0.7" />
          <line x1="226" y1="210" x2="228" y2="268" stroke={C} strokeWidth="0.8" opacity="0.5" />
          <circle cx="212" cy="232" r="2" fill={C} opacity="0.9" />
          <circle cx="212" cy="252" r="2" fill={C} opacity="0.9" />
        </motion.g>
        {/* Wrist joint */}
        <rect x="204" y="268" width="30" height="10" fill={A} />
        {/* Terminal/clamp hand */}
        <polygon points="202,278 234,278 238,310 198,310" fill={D1} />
        <rect x="205" y="310" width="8" height="14" rx="2" fill={D2} />
        <rect x="216" y="310" width="8" height="18" rx="2" fill={D2} />
        <rect x="227" y="310" width="8" height="14" rx="2" fill={D2} />
        <rect x="202" y="302" width="34" height="10" fill={A} opacity="0.5" />

        {/* ── LEGS ───────────────────────────────────── */}
        {/* Left leg upper */}
        <polygon points="86,266 136,266 132,370 82,368" fill={D2} />
        {/* Left leg pocket */}
        <rect x="90" y="300" width="32" height="24" rx="2" fill={D1} stroke={D3} strokeWidth="1" />
        {/* Left knee guard */}
        <rect x="86" y="350" width="44" height="22" rx="3" fill={A} opacity="0.75" />
        <line x1="90" y1="356" x2="126" y2="356" stroke={D1} strokeWidth="1.5" />
        <line x1="90" y1="362" x2="126" y2="362" stroke={D1} strokeWidth="1.5" />
        {/* Left lower leg */}
        <polygon points="84,372 130,372 126,430 88,430" fill={D2} />
        <rect x="88" y="380" width="34" height="8" fill={D3} />
        <rect x="88" y="396" width="34" height="8" fill={D3} />
        <rect x="88" y="412" width="34" height="8" fill={D3} />

        {/* Right leg upper */}
        <polygon points="144,266 194,266 198,368 148,370" fill={D2} />
        {/* Right leg pocket */}
        <rect x="158" y="300" width="32" height="24" rx="2" fill={D1} stroke={D3} strokeWidth="1" />
        {/* Right knee guard */}
        <rect x="150" y="350" width="44" height="22" rx="3" fill={A} opacity="0.75" />
        <line x1="154" y1="356" x2="190" y2="356" stroke={D1} strokeWidth="1.5" />
        <line x1="154" y1="362" x2="190" y2="362" stroke={D1} strokeWidth="1.5" />
        {/* Right lower leg */}
        <polygon points="150,372 196,372 192,430 154,430" fill={D2} />
        <rect x="158" y="380" width="34" height="8" fill={D3} />
        <rect x="158" y="396" width="34" height="8" fill={D3} />
        <rect x="158" y="412" width="34" height="8" fill={D3} />

        {/* ── BOOTS ──────────────────────────────────── */}
        {/* Left boot */}
        <polygon points="80,428 132,428 136,470 74,470" fill={D1} />
        <rect x="78" y="462" width="60" height="14" rx="2" fill={D1} />
        <rect x="82" y="430" width="46" height="8" fill={A} opacity="0.65" />
        <polygon points="66,470 138,470 142,484 62,484" fill={D2} />
        <rect x="66" y="482" width="76" height="8" rx="2" fill={D1} />
        {/* Right boot */}
        <polygon points="148,428 200,428 206,470 144,470" fill={D1} />
        <rect x="142" y="462" width="60" height="14" rx="2" fill={D1} />
        <rect x="152" y="430" width="46" height="8" fill={A} opacity="0.65" />
        <polygon points="142,470 214,470 218,484 138,484" fill={D2} />
        <rect x="138" y="482" width="76" height="8" rx="2" fill={D1} />

        {/* ── GLOW ACCENTS ───────────────────────────── */}
        {/* Amber ambient glow under figure — very subtle */}
        <ellipse cx="140" cy="490" rx="70" ry="6" fill={A} opacity="0.08" />

      </motion.g>
    </svg>
  );
};

export default CharacterIllustration;
