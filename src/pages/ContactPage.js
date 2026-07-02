import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './ContactPage.css';

const defaultContactInfo = [
  { icon: '📞', title: 'Phone', lines: ['1800-XXX-XXXX', 'Mon-Sat: 9 AM - 6 PM'] },
  { icon: '✉️', title: 'Email', lines: ['support@xohobank.com', 'We reply within 24 hours'] },
  { icon: '📍', title: 'Address', lines: ['123 Banking Street', 'Mumbai, India - 400001'] }
];

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [infoLoading, setInfoLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    apiService.getContactInfo()
      .then(data => setContactInfo(data?.contacts || data || defaultContactInfo))
      .catch(() => setContactInfo(defaultContactInfo))
      .finally(() => setInfoLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.submitContactForm(formData);
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We're here to help you with all your banking needs</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          {infoLoading ? <LoadingSpinner message="Loading contact info..." /> : (
            contactInfo.map((item, index) => (
              <div key={index} className="info-card">
                <div className="info-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                {(item.lines || item.details || []).map((line, i) => <p key={i}>{line}</p>)}
              </div>
            ))
          )}
        </div>
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          {submitted && (
            <div className="success-banner">✅ Thank you! We'll get back to you within 24 hours.</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Subject *</label>
              <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea rows="5" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
            </div>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
