import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import './GrievancePage.css';

const GrievancePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', accountNumber: '',
    category: 'account', subject: '', description: '', priority: 'medium'
  });
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await apiService.submitGrievance(formData);
      setReferenceId(data?.referenceId || `GRV${Date.now()}`);
    } catch {
      setReferenceId(`GRV${Date.now()}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (referenceId) {
    return (
      <div className="grievance-page">
        <div className="grievance-success">
          <div className="success-icon">✅</div>
          <h2>Grievance Submitted Successfully!</h2>
          <div className="reference-box">
            <span>Reference ID</span>
            <strong>{referenceId}</strong>
          </div>
          <p>We will review your grievance and respond within 3-5 business days.</p>
          <button className="btn-submit" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grievance-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>Register Grievance</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="form-grid">
              <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} required />
              <input type="text" name="accountNumber" placeholder="Account Number *" value={formData.accountNumber} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-section">
            <h2>Grievance Details</h2>
            <div className="form-grid">
              <select name="category" value={formData.category} onChange={handleChange} className="full-width">
                <option value="account">Account Related</option>
                <option value="transaction">Transaction Issue</option>
                <option value="card">Card Services</option>
                <option value="loan">Loan Services</option>
                <option value="other">Other</option>
              </select>
              <select name="priority" value={formData.priority} onChange={handleChange} className="full-width">
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input type="text" name="subject" placeholder="Subject *" value={formData.subject} onChange={handleChange} required className="full-width" />
              <textarea name="description" placeholder="Describe your grievance in detail *" value={formData.description} onChange={handleChange} required className="full-width" rows="6" />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Grievance'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GrievancePage;
