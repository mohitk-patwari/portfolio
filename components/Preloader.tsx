import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const quotes = [
  { text: "With great power comes great responsibility.", by: "Uncle Ben", source: "Spider-Man" },
  { text: "I am Iron Man.", by: "Tony Stark", source: "Avengers: Endgame" },
  { text: "May the Force be with you.", by: "A Galaxy Far Away", source: "Star Wars" },
  { text: "Do. Or do not. There is no try.", by: "Yoda", source: "The Empire Strikes Back" },
  { text: "I can do this all day.", by: "Steve Rogers", source: "Captain America" },
  { text: "Whatever it takes.", by: "The Avengers", source: "Avengers: Endgame" },
  { text: "The greatest teacher, failure is.", by: "Yoda", source: "The Last Jedi" },
  { text: "Part of the journey is the end.", by: "Tony Stark", source: "Avengers: Endgame" },
  { text: "I am inevitable.", by: "Thanos", source: "Avengers: Endgame" },
  { text: "It's not who I am underneath, but what I do that defines me.", by: "Bruce Wayne", source: "Batman Begins" },
  { text: "I'm Batman.", by: "Batman", source: "Batman (1989)" },
  { text: "With great power, there must also come great responsibility.", by: "Peter Parker", source: "Spider-Man (2002)" },
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [quote, setQuote] = useState<(typeof quotes)[0] | null>(null);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => onCompleteRef.current(), 2500);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center gap-8 px-8"
      style={{ background: "#080e18" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Porthole */}
      <svg
        viewBox="0 0 200 200"
        width="260"
        height="260"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <clipPath id="porthole-clip">
            <circle cx="100" cy="100" r="93" />
          </clipPath>
        </defs>

        {/* Inner dark background */}
        <rect width="200" height="200" fill="#060d18" clipPath="url(#porthole-clip)" />

        {/* Wave group — bobs up and down */}
        <g
          clipPath="url(#porthole-clip)"
          style={{ animation: "wave-bob 3.2s ease-in-out infinite" }}
        >
          {/* Water body fill */}
          <path
            d="M-10,118 C20,100 50,136 80,118 C110,100 140,136 170,118 C200,100 230,136 260,118 L260,210 L-10,210 Z"
            fill="#3dd6c8"
            opacity="0.18"
          />
          {/* Secondary deeper fill */}
          <path
            d="M-10,126 C25,112 55,140 85,126 C115,112 145,140 175,126 C205,112 235,140 265,126 L265,210 L-10,210 Z"
            fill="#3dd6c8"
            opacity="0.12"
          />
          {/* Wave crest line */}
          <path
            d="M-10,118 C20,100 50,136 80,118 C110,100 140,136 170,118 C200,100 230,136 260,118"
            fill="none"
            stroke="#3dd6c8"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Surfer silhouette — positioned on the wave crest */}
          <g fill="#060d18">
            {/* Surfboard */}
            <ellipse cx="100" cy="122" rx="24" ry="4.5" fill="#0a1a2a" />
            {/* Legs — wide surf stance */}
            <polygon points="95,120 87,122 90,122 96,118" />
            <polygon points="105,120 113,122 110,122 104,118" />
            {/* Body torso */}
            <rect x="96" y="100" width="8" height="20" rx="3" />
            {/* Head */}
            <circle cx="100" cy="93" r="8" />
            {/* Arms spread wide for balance */}
            <rect x="76" y="107" width="48" height="4" rx="2" />
          </g>
        </g>

        {/* Outer porthole ring */}
        <circle
          cx="100" cy="100" r="93"
          fill="none"
          stroke="#3dd6c8"
          strokeWidth="1.5"
          opacity="0.55"
        />
        {/* Decorative bolt detail at compass points */}
        <circle cx="100" cy="5"   r="3.5" fill="#1e4976" />
        <circle cx="100" cy="195" r="3.5" fill="#1e4976" />
        <circle cx="5"   cy="100" r="3.5" fill="#1e4976" />
        <circle cx="195" cy="100" r="3.5" fill="#1e4976" />
        {/* Thin outer rim ring */}
        <circle
          cx="100" cy="100" r="97"
          fill="none"
          stroke="#1e4976"
          strokeWidth="0.75"
          opacity="0.5"
        />
      </svg>

      {/* Quote */}
      <div className="flex flex-col items-center gap-3 text-center" style={{ maxWidth: 400 }}>
        <motion.p
          className="font-mono text-[9px] tracking-[0.3em] uppercase"
          style={{ color: "#3dd6c840" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          // initialising
        </motion.p>

        {quote && (
          <>
            <motion.blockquote
              className="font-mono text-base leading-relaxed"
              style={{ color: "#f0e6c8", fontStyle: "italic" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
            >
              &ldquo;{quote.text}&rdquo;
            </motion.blockquote>

            <motion.p
              className="font-mono text-xs"
              style={{ color: "#f0e6c866" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              — {quote.by} &nbsp;&middot;&nbsp; <span style={{ color: "#f0e6c840" }}>{quote.source}</span>
            </motion.p>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 2, background: "#1e497630" }}
        aria-hidden="true"
      >
        <div
          style={{
            height: "100%",
            width: "0%",
            background: "#3dd6c8",
            animation: "ticker-progress 2.4s linear 0.15s forwards",
          }}
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
