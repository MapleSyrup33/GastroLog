import { ArrowRight, ClipboardList, TrendingUp, Trash2 } from 'lucide-react';
import Header from '../components/Header';

const Home = ({ onNavigate }) => {
  return (
    <div className="landing-page">
      <div className="landing-container">
          <Header/>
        
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