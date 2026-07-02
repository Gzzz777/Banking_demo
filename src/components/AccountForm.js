import React, { useState } from 'react';
import './AccountForm.css';

const AccountForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    accountType: 'savings',
    initialDeposit: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account opening request submitted successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Open New Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
          >
            <option value="savings">Savings Account</option>
            <option value="current">Current Account</option>
          </select>
          <input
            type="number"
            name="initialDeposit"
            placeholder="Initial Deposit Amount"
            value={formData.initialDeposit}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
