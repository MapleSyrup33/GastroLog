import {
  Layers,
  LayoutDashboard,
  Package,
  PieChart,
  Users,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router";
function DashboardHeader() {
  const navigate = useNavigate();
  return (
    
      <aside className="sidebar">
        <div onClick={() => navigate("home")} className="sidebar-brand">
          <div className="brand-logo">
            <Layers className="logo-icon" />
          </div>
          <span className="brand-name">GastroLog</span>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <LayoutDashboard />
            <span>Dashboard</span>
          </div>
          <div className="nav-item">
            <Package />
            <span>Products</span>
          </div>
          <div className="nav-item">
            <PieChart />
            <span>Analytics</span>
          </div>
          <div className="nav-item">
            <Users />
            <span>Suppliers</span>
          </div>
          <div className="nav-item">
            <Settings />
            <span>Settings</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">
              <span>JD</span>
            </div>
            <div className="user-info">
              <span className="user-name">John Doe</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </aside>
  );
}

export default DashboardHeader;
