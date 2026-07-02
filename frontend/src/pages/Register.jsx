import Header from "../components/Header";
import { useNavigate } from "react-router";
function Register() {
      const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="auth-page">
        <div className="auth-visual-panel">
          <div className="auth-visual-content">
            <p className="auth-visual-label">GastroLog</p>
            <h2>Welcome! Create an account for a hassle free inventory.</h2>
            <p>Manage stock, track inventory, and stay ahead of every order.</p>
          </div>
        </div>
        <div className="auth-form-panel">
          <form className="auth-card auth-form">
            <h3>Sign Up</h3>
            <div className="auth-field">
              <label>First name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="First name"
              />
            </div>
            <div className="auth-field">
              <label>Last name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="Last name"
              />
            </div>
            <div className="auth-field">
              <label>Email address</label>
              <input
                type="email"
                className="auth-input"
                placeholder="Enter email"
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Enter password"
              />
            </div>
            <div className="auth-actions">
              <button type="submit" className="auth-submit" onClick={() => navigate("/")}>
                Sign Up
              </button>
            </div>
            <p className="auth-footer">
              Already registered <a className="auth-link" onClick={()=> navigate("/login")}>sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
