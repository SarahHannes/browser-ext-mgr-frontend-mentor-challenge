import extLogo from "/logo.svg";
import iconSun from "/icon-sun.svg";
import iconMoon from "/icon-moon.svg";

export default function Header({
  headerClass,
  buttonClass,
  logoImgClass,
  darkMode,
  toggleDarkMode,
}) {
  return (
    <header className={headerClass}>
      <a href="#" className="outline-0">
        <img className={logoImgClass} src={extLogo} alt="Extensions logo" />
      </a>
      <button className={buttonClass} onClick={toggleDarkMode}>
        <img
          src={darkMode ? iconSun : iconMoon}
          alt="Click to toggle to dark mode"
        />
      </button>
    </header>
  );
}
