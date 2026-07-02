import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Banking Made Simple</h1>
        <p>Experience seamless digital banking with XOHO - Your trusted financial partner</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate('/account-opening')}>Open Account</button>
          <button className="btn-secondary" onClick={() => navigate('/services')}>Our Services</button>
        </div>
      </div>
      <div className="hero-image">
        <div className="phone-mockup"></div>
      </div>
    </section>
  );
};

export default Hero;
