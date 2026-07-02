import Header from "../components/Header"
function Login() {
    return(
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
                    <form className="auth-card auth-form">
                        <h3>Log In</h3>
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
                        <div className="auth-checkbox">
                            <input type="checkbox" id="customCheck1" />
                            <label htmlFor="customCheck1">Remember me</label>
                        </div>
                        <div className="auth-actions">
                            <button type="submit" className="auth-submit">
                                Submit
                            </button>
                        </div>
                        <p className="auth-footer">
                            Forgot <a href="#" className="auth-link">password?</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login