import "./Logo.css";

function Logo({ className = "" }) {
  return (
    <svg
      className={`logo-mark ${className}`}
      viewBox="0 0 190 68"
      role="img"
      aria-label="FIT IT Desodorante"
    >
      <defs>
        <linearGradient id="logoSwoosh" x1="20%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1c8fae" />
          <stop offset="100%" stopColor="#8fe0f0" />
        </linearGradient>
      </defs>

      <path
        className="logo-swoosh"
        fill="url(#logoSwoosh)"
        d="M62 50c26 6 54 0 76-32-12 34-42 48-76 44z"
      />
      <path
        className="logo-star"
        d="M150 6.5l1.9 3.8 4.2.6-3 3 .7 4.2-3.8-2-3.8 2 .7-4.2-3-3 4.2-.6z"
      />

      <text x="2" y="18" className="logo-fit-text">
        FIT
      </text>
      <text x="0" y="58" className="logo-it-text">
        IT
      </text>
    </svg>
  );
}

export default Logo;
