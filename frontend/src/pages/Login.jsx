import { useState } from "react";
import Header from "../components/Header";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/token/", {
        email: email,
        password: password,
      });

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          "Failed to log in. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className="auth-visual-panel">
          <div className="auth-visual-content">
            <p className="auth-visual-label">GastroLog</p>
            <h2>Welcome back to your kitchen command center.</h2>
            <p>Manage stock, track inventory, and stay ahead of every order.</p>
          </div>
        </div>
        <div className="auth-form-panel">
          <form onSubmit={handleSubmit} className="auth-card auth-form">
            <h3>Log In</h3>
            <div className="auth-field">
              <label>Email address</label>
              <input
                type="email"
                className="auth-input"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p
                className="auth-error"
                style={{ color: "var(--status-out-text)" }}
              >
                {error}
              </p>
            )}
            <div className="auth-checkbox">
              <input type="checkbox" id="customCheck1" />
              <label htmlFor="customCheck1">Remember me</label>
            </div>
            <div className="auth-actions">
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "Logging in..." : "Submit"}
              </button>
            </div>
            <p className="auth-footer">
              Forgot{" "}
              <a href="#" className="auth-link">
                password?
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
