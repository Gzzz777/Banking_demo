import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoanTrackingPage.css';

const LoanTrackingPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedOffer = state?.selectedOffer;
  const loanAmount = state?.loanAmount;
  const tenure = state?.tenure;
  const userData = state?.userData;

  const timeline = [
    { title: 'Application Submitted', status: 'completed' },
    { title: 'Document Verification', status: 'in-progress' },
    { title: 'Credit Evaluation', status: 'pending' },
    { title: 'Approval & Disbursal', status: 'pending' }
  ];

  return (
    <div className="loan-tracking-page">
      <div className="tracking-hero">
        <h1>Loan Tracking</h1>
        <p>Your application is in progress. We’ll notify you on every step.</p>
      </div>

      <div className="tracking-card">
        <div className="tracking-summary">
          <div>
            <span>Applicant</span>
            <strong>{userData?.name || 'Customer'}</strong>
          </div>
          <div>
            <span>Loan Amount</span>
            <strong>₹ {loanAmount?.toLocaleString('en-IN') || 'N/A'}</strong>
          </div>
          <div>
            <span>Tenure</span>
            <strong>{tenure ? `${tenure} Months` : 'N/A'}</strong>
          </div>
          <div>
            <span>Offer</span>
            <strong>{selectedOffer?.name || 'Personal Loan'}</strong>
          </div>
        </div>

        <div className="tracking-steps">
          {timeline.map((item, index) => (
            <div key={index} className={`tracking-step ${item.status}`}>
              <div className="step-dot" />
              <div className="step-content">
                <div className="step-title">{item.title}</div>
                <div className="step-subtitle">
                  {item.status === 'completed' && 'Done'}
                  {item.status === 'in-progress' && 'In progress'}
                  {item.status === 'pending' && 'Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="tracking-actions">
          <button className="btn-secondary" onClick={() => navigate('/personal-loans')}>
            Back to Loans
          </button>
          <button className="btn-primary" onClick={() => navigate('/loan-application', { state })}>
            Edit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanTrackingPage;
