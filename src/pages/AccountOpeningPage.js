import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountOpeningPage.css';

const AccountOpeningPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    pincode: '',
    accountType: 'savings',
    initialDeposit: '',
    panCard: '',
    aadharCard: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account opening request submitted successfully!');
    navigate('/');
  };

  return (
    <div className="account-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>Open New Account</h1>
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Personal Info</div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Address</div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Account Details</div>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={step === 3 ? handleSubmit : handleNext}>
          {step === 1 && (
            <div className="form-section">
              <h2>Personal Information</h2>
              <div className="form-grid">
                <input type="text" name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} required />
                <input type="date" name="dob" placeholder="Date of Birth *" value={formData.dob} onChange={handleChange} required />
                <input type="text" name="panCard" placeholder="PAN Card Number *" value={formData.panCard} onChange={handleChange} required />
                <input type="text" name="aadharCard" placeholder="Aadhar Card Number *" value={formData.aadharCard} onChange={handleChange} required />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h2>Address Details</h2>
              <div className="form-grid">
                <textarea name="address" placeholder="Complete Address *" value={formData.address} onChange={handleChange} required className="full-width" />
                <input type="text" name="city" placeholder="City *" value={formData.city} onChange={handleChange} required />
                <input type="text" name="pincode" placeholder="PIN Code *" value={formData.pincode} onChange={handleChange} required />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h2>Account Configuration</h2>
              <div className="form-grid">
                <select name="accountType" value={formData.accountType} onChange={handleChange} className="full-width">
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                  <option value="salary">Salary Account</option>
                </select>
                <input type="number" name="initialDeposit" placeholder="Initial Deposit Amount *" value={formData.initialDeposit} onChange={handleChange} required className="full-width" />
              </div>
              <div className="info-box">
                <h3>Account Benefits:</h3>
                <ul>
                  <li>Zero balance account</li>
                  <li>Free debit card</li>
                  <li>Internet & mobile banking</li>
                  <li>24/7 customer support</li>
                </ul>
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && <button type="button" className="btn-back" onClick={handleBack}>Previous</button>}
            <button type="submit" className="btn-next">{step === 3 ? 'Submit Application' : 'Next'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountOpeningPage;
