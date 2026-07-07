import { useState } from "react";
import api from "../api";
import Header from "../components/Header";
import { useNavigate } from "react-router";

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("manager");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/auth/user/register/", {
        email,
        username: email.split("@")[0],
        password,
        first_name: firstName,
        last_name: lastName,
        role,
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || "Registration failed. Please try again.",
      );
    }
  };
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
          <form onSubmit={handleSubmit} className="auth-card auth-form">
            <h3>Sign Up</h3>
            <div className="auth-field">
              <label>First name</label>
              <input
                type="text"
                className="auth-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div className="auth-field">
              <label>Last name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label>Email address</label>
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                type="password"
                className="auth-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm password"
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            {success && (
              <p className="auth-success">Account created successfully.</p>
            )}
            <div className="auth-field">
              <label>Select a Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="auth-input"
              >
                <option value="admin">Admin/Owner</option>
                <option value="manager">Manager</option>
                <option value="staff">Kitchen Staff</option>
              </select>
            </div>
            <div className="auth-actions">
              <button type="submit" className="auth-submit">
                Sign Up
              </button>
            </div>
            <p className="auth-footer">
              Already registered{" "}
              <a className="auth-link" onClick={() => navigate("/login")}>
                sign in?
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
