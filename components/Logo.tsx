interface LogoProps {
  variant?: "mark" | "wordmark" | "full";
  className?: string;
}

const STROKE = "#e6d44a";
const ACCENT = "#3dd6c8";
const SW = "3";
const SW_THIN = "1.5";

/* Symbol mark — targeting reticle node, 28×28 */
const Mark = () => (
  <svg
    viewBox="0 0 28 28"
    width="28"
    height="28"
    fill="none"
    aria-hidden="true"
  >
    {/* Outer ring */}
    <circle cx="14" cy="14" r="11" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
    {/* Cardinal tick marks */}
    <line x1="14" y1="1"  x2="14" y2="5"  stroke={ACCENT} strokeWidth={SW_THIN} strokeLinecap="square" />
    <line x1="14" y1="23" x2="14" y2="27" stroke={ACCENT} strokeWidth={SW_THIN} strokeLinecap="square" />
    <line x1="1"  y1="14" x2="5"  y2="14" stroke={ACCENT} strokeWidth={SW_THIN} strokeLinecap="square" />
    <line x1="23" y1="14" x2="27" y2="14" stroke={ACCENT} strokeWidth={SW_THIN} strokeLinecap="square" />
    {/* Diagonal corner nicks */}
    <line x1="7"  y1="7"  x2="9.5"  y2="9.5"  stroke={STROKE} strokeWidth="1" strokeLinecap="square" />
    <line x1="21" y1="7"  x2="18.5" y2="9.5"  stroke={STROKE} strokeWidth="1" strokeLinecap="square" />
    <line x1="7"  y1="21" x2="9.5"  y2="18.5" stroke={STROKE} strokeWidth="1" strokeLinecap="square" />
    <line x1="21" y1="21" x2="18.5" y2="18.5" stroke={STROKE} strokeWidth="1" strokeLinecap="square" />
    {/* Center dot */}
    <circle cx="14" cy="14" r="2.5" fill={STROKE} />
  </svg>
);

/*
  MOHIT wordmark — geometric strokes, 130×24 viewBox
  Each letter: height 24 (y: 0–24), stroke-width 3, square caps
  Letters: M(0–20) O(24–44) H(48–68) I(72–80) T(84–104)
*/
const Wordmark = () => (
  <svg
    viewBox="0 0 106 24"
    width="106"
    height="24"
    fill="none"
    aria-label="MOHIT"
  >
    <g stroke={STROKE} strokeWidth={SW} strokeLinecap="square" strokeLinejoin="miter">
      {/* M */}
      <polyline points="0,24 0,0 10,13 20,0 20,24" />
      {/* O */}
      <rect x="24" y="0" width="20" height="24" />
      {/* H */}
      <line x1="48" y1="0"  x2="48" y2="24" />
      <line x1="68" y1="0"  x2="68" y2="24" />
      <line x1="48" y1="12" x2="68" y2="12" />
      {/* I */}
      <line x1="72" y1="0"  x2="80" y2="0"  />
      <line x1="76" y1="0"  x2="76" y2="24" />
      <line x1="72" y1="24" x2="80" y2="24" />
      {/* T */}
      <line x1="84" y1="0"   x2="104" y2="0"  />
      <line x1="94" y1="0"   x2="94"  y2="24" />
    </g>
  </svg>
);

/* Full — mark + wordmark, 16px gap */
const Full = () => (
  <svg
    viewBox="0 0 150 28"
    width="150"
    height="28"
    fill="none"
    aria-label="MOHIT"
  >
    {/* Mark centered at 14,14 */}
    <g>
      <circle cx="14" cy="14" r="11" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
      <line x1="14" y1="1"  x2="14" y2="5"  stroke={ACCENT} strokeWidth={SW_THIN} strokeLinecap="square" />
      <line x1="14" y1="23" x2="14" y2="27" stroke={ACCENT} strokeWidth={SW_THIN} strokeLinecap="square" />
      <line x1="1"  y1="14" x2="5"  y2="14" stroke={ACCENT} strokeWidth={SW_THIN} strokeLinecap="square" />
      <line x1="23" y1="14" x2="27" y2="14" stroke={ACCENT} strokeWidth={SW_THIN} strokeLinecap="square" />
      <line x1="7"  y1="7"  x2="9.5"  y2="9.5"  stroke={STROKE} strokeWidth="1" strokeLinecap="square" />
      <line x1="21" y1="7"  x2="18.5" y2="9.5"  stroke={STROKE} strokeWidth="1" strokeLinecap="square" />
      <line x1="7"  y1="21" x2="9.5"  y2="18.5" stroke={STROKE} strokeWidth="1" strokeLinecap="square" />
      <line x1="21" y1="21" x2="18.5" y2="18.5" stroke={STROKE} strokeWidth="1" strokeLinecap="square" />
      <circle cx="14" cy="14" r="2.5" fill={STROKE} />
    </g>
    {/* Wordmark offset by 44 (28 mark + 16 gap), vertically centered in 28px */}
    <g transform="translate(44, 2)" stroke={STROKE} strokeWidth={SW} strokeLinecap="square" strokeLinejoin="miter" fill="none">
      <polyline points="0,24 0,0 10,13 20,0 20,24" />
      <rect x="24" y="0" width="20" height="24" />
      <line x1="48" y1="0"  x2="48" y2="24" />
      <line x1="68" y1="0"  x2="68" y2="24" />
      <line x1="48" y1="12" x2="68" y2="12" />
      <line x1="72" y1="0"  x2="80" y2="0"  />
      <line x1="76" y1="0"  x2="76" y2="24" />
      <line x1="72" y1="24" x2="80" y2="24" />
      <line x1="84" y1="0"   x2="104" y2="0"  />
      <line x1="94" y1="0"   x2="94"  y2="24" />
    </g>
  </svg>
);

const Logo = ({ variant = "mark", className = "" }: LogoProps) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      {variant === "mark"     && <Mark />}
      {variant === "wordmark" && <Wordmark />}
      {variant === "full"     && <Full />}
    </div>
  );
};

export default Logo;
