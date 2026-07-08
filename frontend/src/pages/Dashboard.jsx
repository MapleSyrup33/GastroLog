import DashboardHeader from "../components/DashboardHeader";
import { useTheme } from "../hooks/useTheme";
import { Moon, Sun, Search } from "lucide-react";
function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="app-container">
      <DashboardHeader />
      <div className="main-layout">
        <header className="landing-header">
          <div className="header-search">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search products, SKUs, categories..."
              id="search-bar"
            />
          </div>
          <div className="header-actions">
            <button
              className="action-btn-icon"
              onClick={toggleTheme}
              title="Toggle Light/Dark Mode"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Dashboard;
