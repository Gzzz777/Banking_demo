import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './PersonalLoanPage.css';

const defaultOffers = [
  { id: 1, name: 'Jumbo Loan', roi: 12, tagline: 'Big Dreams, Bigger Loans', features: ['Up to ₹50 Lakhs', 'Minimal Documentation', 'Quick Disbursal'], color: '#1e40af' },
  { id: 2, name: 'Only4U Loan', roi: 11, tagline: 'Exclusive Offer Just For You', features: ['Pre-Approved', 'Lowest Interest Rate', 'Flexible Tenure'], color: '#059669' }
];

const PersonalLoanPage = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(36);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOffers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiService.getLoanOffers();
      setOffers(data?.offers || data || defaultOffers);
    } catch {
      setOffers(defaultOffers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOffers(); }, []);

  const handleApplyClick = (offer = null) => {
    const chosenOffer = offer || selectedOffer;
    const applyUserData = userData || {
      name: 'John Doe', accountNumber: '1234567890',
      ifscCode: 'XOHO0001234', bankName: 'XOHO Bank', accountType: 'Savings'
    };
    navigate('/loan-application', { state: { selectedOffer: chosenOffer, loanAmount, tenure, userData: applyUserData } });
  };

  const calculateEMI = (principal, rate, months) => {
    const r = rate / (12 * 100);
    return Math.round((principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
  };

  const standardROI = 13.5;
  const currentROI = selectedOffer ? selectedOffer.roi : standardROI;
  const emi = calculateEMI(loanAmount, currentROI, tenure);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;

  if (loading) return <LoadingSpinner message="Loading loan offers..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchOffers} />;

  return (
    <div className="personal-loan-page">
      <div className="loan-banner-section">
        <h1>Personal Loans</h1>
        <p className="banner-subtitle">Fulfill your dreams with our attractive loan offers</p>
        <div className="offers-container">
          {offers.map(offer => (
            <div
              key={offer.id}
              className={`offer-card ${selectedOffer?.id === offer.id ? 'selected' : ''}`}
              style={{ borderColor: offer.color }}
              onClick={() => setSelectedOffer(offer)}
            >
              <div className="offer-badge" style={{ backgroundColor: offer.color }}>Special Offer</div>
              <h2>{offer.name}</h2>
              <p className="offer-tagline">{offer.tagline}</p>
              <div className="roi-display">
                <span className="roi-value">{offer.roi}%</span>
                <span className="roi-label">Rate of Interest</span>
              </div>
              <ul className="offer-features">
                {offer.features.map((f, idx) => <li key={idx}>✓ {f}</li>)}
              </ul>
              <button
                className="offer-btn"
                style={{ backgroundColor: offer.color }}
                onClick={(e) => { e.stopPropagation(); handleApplyClick(offer); }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="loan-calculator-section">
        <div className="calculator-container">
          <div className="calculator-left">
            <h2>Personal Loan Calculator</h2>
            <div className="input-group">
              <label>Loan Amount</label>
              <div className="slider-container">
                <input type="range" min="50000" max="5000000" step="50000" value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))} className="slider" />
                <div className="slider-value">₹ {loanAmount.toLocaleString('en-IN')}</div>
              </div>
            </div>
            <div className="input-group">
              <label>Loan Tenure (Months)</label>
              <div className="slider-container">
                <input type="range" min="12" max="84" step="6" value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))} className="slider" />
                <div className="slider-value">{tenure} Months ({Math.round(tenure / 12)} Years)</div>
              </div>
            </div>
            <div className="input-group">
              <label>Interest Rate</label>
              <div className="rate-display">
                {currentROI}% p.a.
                {selectedOffer && <span className="rate-badge">{selectedOffer.name} Rate</span>}
              </div>
            </div>
          </div>
          <div className="calculator-right">
            <div className="emi-result">
              <h3>Monthly EMI</h3>
              <div className="emi-amount">₹ {emi.toLocaleString('en-IN')}</div>
            </div>
            <div className="breakdown">
              <div className="breakdown-item"><span>Principal Amount</span><span>₹ {loanAmount.toLocaleString('en-IN')}</span></div>
              <div className="breakdown-item"><span>Total Interest</span><span>₹ {totalInterest.toLocaleString('en-IN')}</span></div>
              <div className="breakdown-item total"><span>Total Amount Payable</span><span>₹ {totalAmount.toLocaleString('en-IN')}</span></div>
            </div>
            <button className="apply-loan-btn" onClick={() => handleApplyClick()}>Apply for Loan</button>
          </div>
        </div>
      </div>

      <div className="loan-features-section">
        <h2>Why Choose Our Personal Loan?</h2>
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon">⚡</div><h3>Instant Approval</h3><p>Get approval in minutes with minimal documentation</p></div>
          <div className="feature-card"><div className="feature-icon">💰</div><h3>Competitive Rates</h3><p>Starting from 11% p.a. with flexible repayment options</p></div>
          <div className="feature-card"><div className="feature-icon">📱</div><h3>100% Digital</h3><p>Complete process online from application to disbursal</p></div>
          <div className="feature-card"><div className="feature-icon">🔒</div><h3>Secure Process</h3><p>Bank-grade security for all your transactions</p></div>
        </div>
      </div>

      <div className="eligibility-section">
        <h2>Eligibility Criteria</h2>
        <div className="eligibility-content">
          <div className="eligibility-column">
            <h3>Salaried Individuals</h3>
            <ul>
              <li>Age: 21 to 60 years</li>
              <li>Minimum Income: ₹25,000 per month</li>
              <li>Work Experience: 2 years minimum</li>
              <li>Credit Score: 700 and above</li>
            </ul>
          </div>
          <div className="eligibility-column">
            <h3>Self-Employed</h3>
            <ul>
              <li>Age: 25 to 65 years</li>
              <li>Business Vintage: 3 years minimum</li>
              <li>Annual Income: ₹3 Lakhs minimum</li>
              <li>Credit Score: 700 and above</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="documents-section">
        <h2>Documents Required</h2>
        <div className="documents-grid">
          <div className="doc-item"><span className="doc-icon">📄</span><span>Identity Proof (Aadhaar/PAN/Passport)</span></div>
          <div className="doc-item"><span className="doc-icon">🏠</span><span>Address Proof (Utility Bill/Rent Agreement)</span></div>
          <div className="doc-item"><span className="doc-icon">💼</span><span>Income Proof (Salary Slips/ITR)</span></div>
          <div className="doc-item"><span className="doc-icon">🏦</span><span>Bank Statements (Last 6 months)</span></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanPage;
