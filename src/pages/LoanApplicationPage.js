import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiService from '../services/apiService';
import './LoanApplicationPage.css';

const LoanApplicationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedOffer, loanAmount, tenure, userData } = location.state || {};
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmHuman, setConfirmHuman] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', dob: '', gender: '', maritalStatus: '', email: '', mobile: '', panCard: '', aadhar: '',
    address: '', city: '', state: '', pincode: '', residenceType: '', yearsAtAddress: '',
    employmentType: '', companyName: '', designation: '', monthlyIncome: '', workExperience: '', officeAddress: '',
    loanPurpose: '', existingLoans: '', existingEMI: ''
  });

  useEffect(() => {
    if (!userData) {
      navigate('/personal-loans');
    }
  }, [userData, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmitClick = async (e) => {
    if (!e.nativeEvent?.isTrusted || !confirmHuman) return;
    try {
      await apiService.submitLoanApplication({ ...formData, loanAmount, tenure, offerId: selectedOffer?.id });
    } catch {}
    setShowSuccess(true);
  };

  const steps = ['Personal Details', 'Address Details', 'Employment Details', 'Loan & Documents'];

  return (
    <div className="loan-application-page">
      <div className="application-container">
        <div className="application-sidebar">
          <h2>Loan Application</h2>
          {selectedOffer && (
            <div className="offer-summary">
              <h3>{selectedOffer.name}</h3>
              <div className="offer-detail">
                <span>Interest Rate</span>
                <strong>{selectedOffer.roi}% p.a.</strong>
              </div>
            </div>
          )}
          <div className="loan-summary">
            <div className="summary-detail">
              <span>Loan Amount</span>
              <strong>₹ {loanAmount?.toLocaleString('en-IN')}</strong>
            </div>
            <div className="summary-detail">
              <span>Tenure</span>
              <strong>{tenure} Months</strong>
            </div>
          </div>
          <div className="user-summary">
            <h4>Account Details</h4>
            <p><strong>{userData?.name}</strong></p>
            <p>A/C: {userData?.accountNumber}</p>
            <p>{userData?.bankName}</p>
          </div>
          <div className="steps-sidebar">
            {steps.map((step, index) => (
              <div key={index} className={`step-item ${currentStep === index + 1 ? 'active' : ''} ${currentStep > index + 1 ? 'completed' : ''}`}>
                <div className="step-circle">{currentStep > index + 1 ? '✓' : index + 1}</div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="application-form-area">
          <form
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
              }
            }}
          >
            {currentStep === 1 && (
              <div className="form-section">
                <h2>Personal Details</h2>
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Date of Birth *</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Marital Status *</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Mobile Number *</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>PAN Card *</label>
                    <input type="text" name="panCard" value={formData.panCard} onChange={handleChange} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" required />
                  </div>
                  <div className="form-field">
                    <label>Aadhar Number *</label>
                    <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} pattern="[0-9]{12}" required />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-section">
                <h2>Address Details</h2>
                <div className="form-row">
                  <div className="form-field full-width">
                    <label>Current Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="3" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>State *</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Pincode *</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} pattern="[0-9]{6}" required />
                  </div>
                  <div className="form-field">
                    <label>Residence Type *</label>
                    <select name="residenceType" value={formData.residenceType} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="owned">Owned</option>
                      <option value="rented">Rented</option>
                      <option value="parental">Parental</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Years at Current Address *</label>
                    <input type="number" name="yearsAtAddress" value={formData.yearsAtAddress} onChange={handleChange} min="0" required />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-section">
                <h2>Employment Details</h2>
                <div className="form-row">
                  <div className="form-field">
                    <label>Employment Type *</label>
                    <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self Employed</option>
                      <option value="business">Business Owner</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Company/Business Name *</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Designation *</label>
                    <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Monthly Income (₹) *</label>
                    <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} min="0" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Work Experience (Years) *</label>
                    <input type="number" name="workExperience" value={formData.workExperience} onChange={handleChange} min="0" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field full-width">
                    <label>Office Address *</label>
                    <textarea name="officeAddress" value={formData.officeAddress} onChange={handleChange} rows="3" required />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="form-section">
                <h2>Loan Details & Documents</h2>
                <div className="form-row">
                  <div className="form-field">
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
                  <div className="form-field">
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
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Total Existing EMI (₹)</label>
                    <input type="number" name="existingEMI" value={formData.existingEMI} onChange={handleChange} min="0" />
                  </div>
                </div>

                <div className="form-section">
                  <h3 style={{color:'#2d3748',marginBottom:'16px'}}>Upload Documents</h3>
                  <div className="form-row">
                    <div className="form-field">
                      <label>PAN Card</label>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => setFormData({...formData, docPan: e.target.files[0]})} />
                    </div>
                    <div className="form-field">
                      <label>Aadhar Card</label>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => setFormData({...formData, docAadhar: e.target.files[0]})} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Salary Slips (Last 3 months)</label>
                      <input type="file" accept="image/*,.pdf" multiple onChange={(e) => setFormData({...formData, docSalarySlips: e.target.files})} />
                    </div>
                    <div className="form-field">
                      <label>Bank Statement (Last 6 months)</label>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => setFormData({...formData, docBankStatement: e.target.files[0]})} />
                    </div>
                  </div>
                </div>

                <div className="bank-info-display">
                  <h3>Linked Bank Account</h3>
                  <div className="bank-details-grid">
                    <div><span>Bank Name:</span> <strong>{userData?.bankName}</strong></div>
                    <div><span>Account Number:</span> <strong>{userData?.accountNumber}</strong></div>
                    <div><span>IFSC Code:</span> <strong>{userData?.ifscCode}</strong></div>
                    <div><span>Account Type:</span> <strong>{userData?.accountType}</strong></div>
                  </div>
                </div>

                <div className="declaration-box">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      required
                      checked={confirmHuman}
                      onChange={(e) => {
                        if (!e.nativeEvent?.isTrusted) return;
                        setConfirmHuman(e.target.checked);
                      }}
                    />
                    <span>I hereby declare that all information provided is true and accurate. I authorize the bank to verify my details and credit history.</span>
                  </label>
                </div>
              </div>
            )}

            <div className="form-navigation">
              <button type="button" className="btn-back" onClick={() => navigate('/personal-loans')}>Cancel</button>
              <div className="nav-buttons">
                {currentStep > 1 && (
                  <button type="button" className="btn-prev" onClick={prevStep}>Previous</button>
                )}
                {currentStep < 4 ? (
                  <button type="button" className="btn-next" onClick={nextStep}>Next</button>
                ) : (
                  <button
                    type="button"
                    className="btn-submit"
                    disabled={!confirmHuman}
                    onClick={handleSubmitClick}
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </form>

          {showSuccess && (
            <div className="success-overlay">
              <div className="success-modal">
                <button
                  className="success-close-btn"
                  onClick={() => {
                    setShowSuccess(false);
                    navigate('/loan-tracking', {
                      state: { selectedOffer, loanAmount, tenure, formData, userData }
                    });
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
                  className="btn-next"
                  type="button"
                  onClick={() => {
                    setShowSuccess(false);
                    navigate('/loan-tracking', {
                      state: { selectedOffer, loanAmount, tenure, formData, userData }
                    });
                  }}
                >
                  View Tracking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationPage;
