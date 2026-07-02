import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Leading digital banking platform</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>1800-XXX-XXXX</p>
          <p>support@xoho.com</p>
        </div>
      </div>
      <p className="copyright">&copy; 2024 XOHO Banking. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
