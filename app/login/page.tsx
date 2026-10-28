'use client';

import { useState, type FormEvent } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('alex@forme.studio');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="login-shell">
      <div className="login-panel" aria-label="3D login panel">
        <div className="login-visual">
          <div className="login-visual-card">
            <div className="visual-topbar">
              <span>LIVE ORBIT</span>
              <span className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                ONLINE
              </span>
            </div>

            <div className="visual-platform">
              <div className="visual-ring ring-one" />
              <div className="visual-ring ring-two" />
              <div className="visual-core">
                <div className="core-glow" />
              </div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
            </div>

            <div className="visual-capsule">SYNC / NEBULA</div>
          </div>
        </div>

        <div className="login-card">
          <p className="eyebrow">Access portal</p>
          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to continue to your workspace.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />

            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />

            <div className="form-row">
              <label className="remember-box" htmlFor="remember">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="link-button">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="primary-button">
              Sign in
            </button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-row">
              <button type="button" className="social-button">
                Google
              </button>
              <button type="button" className="social-button">
                GitHub
              </button>
            </div>

            {submitted && (
              <p className="success-message" role="status">
                Logged in successfully. Welcome back.
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
