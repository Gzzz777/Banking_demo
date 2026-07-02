import React, { useState } from 'react';
import './LoanApplication.css';

const LoanApplication = ({ selectedOffer, loanAmount, tenure, onClose, userData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    email: '',
    mobile: '',
    panCard: '',
    aadhar: '',
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    residenceType: '',
    yearsAtAddress: '',
    // Employment
    employmentType: '',
    companyName: '',
    designation: '',
    monthlyIncome: '',
    workExperience: '',
    officeAddress: '',
    // Loan Details
    loanPurpose: '',
    existingLoans: '',
    existingEMI: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const steps = ['Personal', 'Address', 'Employment', 'Documents & Submit'];

  return (
    <div className="loan-application-overlay">
      <div className="loan-application-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="application-header">
          <h2>Personal Loan Application</h2>
          <div className="user-info-badge">
            Welcome, {userData.name} | A/C: {userData.accountNumber}
          </div>
          {selectedOffer && (
            <div className="selected-offer-badge">
              {selectedOffer.name} - {selectedOffer.roi}% ROI
            </div>
          )}
        </div>

        <div className="progress-bar">
          {steps.map((step, index) => (
            <div key={index} className={`progress-step ${currentStep > index ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}>
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{step}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="form-step">
              <h3>Personal Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Marital Status *</label>
                  <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}" required />
                </div>
                <div className="form-group">
                  <label>PAN Card *</label>
                  <input type="text" name="panCard" value={formData.panCard} onChange={handleChange} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" required />
                </div>
                <div className="form-group">
                  <label>Aadhar Number *</label>
                  <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} pattern="[0-9]{12}" required />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h3>Address Details</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Current Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} rows="3" required />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} pattern="[0-9]{6}" required />
                </div>
                <div className="form-group">
                  <label>Residence Type *</label>
                  <select name="residenceType" value={formData.residenceType} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="owned">Owned</option>
                    <option value="rented">Rented</option>
                    <option value="parental">Parental</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Years at Current Address *</label>
                  <input type="number" name="yearsAtAddress" value={formData.yearsAtAddress} onChange={handleChange} min="0" required />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h3>Employment Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Employment Type *</label>
                  <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self Employed</option>
                    <option value="business">Business Owner</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Company/Business Name *</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Designation *</label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Monthly Income (₹) *</label>
                  <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} min="0" required />
                </div>
                <div className="form-group">
                  <label>Work Experience (Years) *</label>
                  <input type="number" name="workExperience" value={formData.workExperience} onChange={handleChange} min="0" required />
                </div>
                <div className="form-group full-width">
                  <label>Office Address *</label>
                  <textarea name="officeAddress" value={formData.officeAddress} onChange={handleChange} rows="3" required />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-step">
              <h3>Loan Details & Documents</h3>
              
              <div className="loan-summary">
                <div className="summary-item">
                  <span>Loan Amount:</span>
                  <strong>₹ {loanAmount?.toLocaleString('en-IN') || 'N/A'}</strong>
                </div>
                <div className="summary-item">
                  <span>Tenure:</span>
                  <strong>{tenure} Months</strong>
                </div>
                {selectedOffer && (
                  <div className="summary-item">
                    <span>Interest Rate:</span>
                    <strong>{selectedOffer.roi}% p.a.</strong>
                  </div>
                )}
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Purpose of Loan *</label>
                  <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} required>
                    <option value="">Select Purpose</option>
                    <option value="medical">Medical Emergency</option>
                    <option value="education">Education</option>
                    <option value="wedding">Wedding</option>
                    <option value="home-renovation">Home Renovation</option>
                    <option value="debt-consolidation">Debt Consolidation</option>
                    <option value="travel">Travel</option>
                    <option value="business">Business Purpose</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Existing Loans *</label>
                  <select name="existingLoans" value={formData.existingLoans} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="none">No Existing Loans</option>
                    <option value="home">Home Loan</option>
                    <option value="car">Car Loan</option>
                    <option value="personal">Personal Loan</option>
                    <option value="multiple">Multiple Loans</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Total Existing EMI (₹)</label>
                  <input type="number" name="existingEMI" value={formData.existingEMI} onChange={handleChange} min="0" />
                </div>
              </div>

              <div className="bank-details-display">
                <h4>Linked Bank Account</h4>
                <div className="bank-info">
                  <div className="bank-info-item">
                    <span>Bank Name:</span>
                    <strong>{userData.bankName}</strong>
                  </div>
                  <div className="bank-info-item">
                    <span>Account Number:</span>
                    <strong>{userData.accountNumber}</strong>
                  </div>
                  <div className="bank-info-item">
                    <span>IFSC Code:</span>
                    <strong>{userData.ifscCode}</strong>
                  </div>
                  <div className="bank-info-item">
                    <span>Account Type:</span>
                    <strong>{userData.accountType}</strong>
                  </div>
                </div>
              </div>

              <div className="documents-upload">
                <h4>Upload Documents</h4>
                <div className="upload-grid">
                  <div className="upload-item">
                    <label>PAN Card</label>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                  <div className="upload-item">
                    <label>Aadhar Card</label>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                  <div className="upload-item">
                    <label>Salary Slips (Last 3 months)</label>
                    <input type="file" accept=".pdf" />
                  </div>
                  <div className="upload-item">
                    <label>Bank Statement (6 months)</label>
                    <input type="file" accept=".pdf" />
                  </div>
                </div>
              </div>

              <div className="declaration">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I hereby declare that all information provided is true and accurate. I authorize the bank to verify my details and credit history.</span>
                </label>
              </div>
            </div>
          )}

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" className="btn-secondary" onClick={prevStep}>
                Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button type="button" className="btn-primary" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn-submit">
                Submit Application
              </button>
            )}
          </div>
        </form>

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-modal">
              <button
                className="success-close-btn"
                onClick={() => {
                  setShowSuccess(false);
                  onClose();
                }}
              >
                ×
              </button>
              <div className="success-check">
                <svg className="success-svg" viewBox="0 0 52 52">
                  <circle className="success-circle" cx="26" cy="26" r="24" fill="none" />
                  <path className="success-checkmark" fill="none" d="M14 27 L22 35 L38 19" />
                </svg>
              </div>
              <h3>Application Submitted</h3>
              <p>Thanks! We’ll review your details and contact you within 24 hours.</p>
              <button
                className="btn-primary"
                type="button"
                onClick={() => {
                  setShowSuccess(false);
                  onClose();
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanApplication;
