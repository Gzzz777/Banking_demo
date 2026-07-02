import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login functionality would be implemented here');
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2>Internet Banking Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn-login">Login</button>
          <div className="form-links">
            <a href="#forgot">Forgot Password?</a>
            <a href="#register">New User? Register</a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
