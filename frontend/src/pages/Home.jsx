import { Layers, ArrowRight, ClipboardList, TrendingUp, Trash2, Sun, Moon } from 'lucide-react';


const Home = ({ onNavigate, theme, onToggleTheme }) => {
  return (
    <div className="landing-page">
      <div className="landing-container">
        
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
              onClick={onToggleTheme} 
              title="Toggle Light/Dark Mode"
            >
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="primary-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              <span>Sign In</span>
              <ArrowRight style={{ marginLeft: '8px', width: '16px', height: '16px' }} />
            </button>
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="primary-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              <span>Log In</span>
              <ArrowRight style={{ marginLeft: '8px', width: '16px', height: '16px' }} />
            </button>
          </div>
        </header>

        {/* Hero Section with particle canvas overlay */}
        <main className="landing-hero">

          
          <div className="hero-content">
            <h1 className="hero-title">
              Kitchens run on speed.<br />We handle the <span>margins</span>.
            </h1>
            <p className="hero-subtitle">
              Count stock in minutes, identify wholesale food cost inflation, and track kitchen waste. GastroLog is the stress-free inventory platform built specifically for busy restaurant operators.
            </p>
            <div className="hero-buttons">
              <button 
                onClick={() => onNavigate('dashboard')} 
                className="primary-btn hero-cta" 
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
              >
                <span>Register Here</span>
                <ArrowRight style={{ marginLeft: '8px', width: '18px', height: '18px' }} />
              </button>
            </div>
          </div>
        </main>

        {/* Dynamic Card Grid */}
        <section className="landing-features">
          <div className="feature-card">
            <div className="feature-icon blue">
              <ClipboardList />
            </div>
            <h3>Stress-Free Counting</h3>
            <p>Simple inventory sheets optimized for mobile and tablets. Count stock in walk-in coolers or dry storage rooms with lightning speed.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon indigo">
              <TrendingUp />
            </div>
            <h3>Food and Liquor Cost Analytics</h3>
            <p>Monitor pricing trends directly from suppliers. Spot wholesale inflation immediately so you can adjust menu prices to protect margins.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon amber">
              <Trash2 />
            </div>
            <h3>Waste Tracking</h3>
            <p>Log prep errors, spoilage, and line waste. Receive clear analytics indicating where your ingredients are losing capital.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <p>&copy; 2026 GastroLog. Simple food waste intelligence & inventory.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;