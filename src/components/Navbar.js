import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import './Navbar.css';

const Navbar = () => {
  const { userData, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adaptiveMode, setAdaptiveMode] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdaptiveToggle = () => {
    const next = !adaptiveMode;
    setAdaptiveMode(next);
    if (window.AdaptiveEngine) window.AdaptiveEngine.setMode(next);
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <Link to="/" className="logo">XOHO</Link>
          <ul className="nav-links">
            <li><NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink></li>
            <li><NavLink to="/services" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Services</NavLink></li>
            <li><NavLink to="/accounts" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Accounts</NavLink></li>
            <li><NavLink to="/personal-loans" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Loans</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Contact</NavLink></li>
          </ul>
          {userData ? (
            <div className="user-menu" ref={dropdownRef}>
              <button className="profile-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {userData.name?.charAt(0).toUpperCase()}
              </button>
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-name">{userData.name}</div>
                  {window.AdaptiveEngine !== undefined && (
                    <label className="adaptive-toggle">
                      <span>Adaptive Mode</span>
                      <input type="checkbox" checked={adaptiveMode} onChange={handleAdaptiveToggle} />
                    </label>
                  )}
                  <button className="dropdown-logout" onClick={() => { setDropdownOpen(false); logout(); }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
          )}
        </nav>
      </header>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLoginSuccess={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;
