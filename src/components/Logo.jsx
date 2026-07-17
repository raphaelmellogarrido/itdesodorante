import "./Logo.css";

function Logo({ className = "" }) {
  return (
    <img src="/logo.png" alt="IT Desodorante" className={`logo-mark ${className}`} />
  );
}

export default Logo;
