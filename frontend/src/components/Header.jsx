import { Layers, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

function Header({ onNavigate }) {
    const { theme, toggleTheme } = useTheme();
  return (
    <>
      {/* Header Navigation */}
      <header className="landing-header">
        <div className="logo-group">
          <div className="brand-logo">
            <Layers className="logo-icon" />
          </div>
          <span className="brand-name">GastroLog</span>
        </div>

        <div className="header-actions">
          <button
            className="action-btn-icon"
            onClick={toggleTheme}
            title="Toggle Light/Dark Mode"
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
          <button
            onClick={() => onNavigate("dashboard")}
            className="primary-btn"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span>Sign In</span>
            <ArrowRight
              style={{ marginLeft: "8px", width: "16px", height: "16px" }}
            />
          </button>
          <button
            onClick={() => onNavigate("dashboard")}
            className="primary-btn"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span>Log In</span>
            <ArrowRight
              style={{ marginLeft: "8px", width: "16px", height: "16px" }}
            />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
