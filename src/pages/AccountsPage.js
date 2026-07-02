import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './AccountsPage.css';

const defaultAccounts = [
  { title: 'Savings Account', features: ['4% Interest Rate', 'Free Debit Card', 'Mobile Banking', 'Zero Balance'], color: '#48bb78' },
  { title: 'Current Account', features: ['Unlimited Transactions', 'Overdraft Facility', 'Business Banking', 'Cheque Book'], color: '#667eea' },
  { title: 'Salary Account', features: ['Zero Charges', 'Instant Loan', 'Insurance Cover', 'Priority Service'], color: '#ed8936' }
];

const AccountsPage = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAccounts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiService.getAccountTypes();
      setAccounts(data?.accounts || data || defaultAccounts);
    } catch {
      setAccounts(defaultAccounts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAccounts(); }, []);

  if (loading) return <LoadingSpinner message="Loading account types..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAccounts} />;

  return (
    <div className="accounts-page">
      <div className="accounts-hero">
        <h1>Bank Accounts</h1>
        <p>Choose the right account for your needs</p>
      </div>
      <div className="accounts-container">
        {accounts.map((account, index) => (
          <div key={index} className="account-card" style={{ borderTopColor: account.color }}>
            <h2>{account.title}</h2>
            <ul>
              {account.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
            <button
              className="open-account-btn"
              style={{ backgroundColor: account.color }}
              onClick={() => navigate('/account-opening')}
            >
              Open Account
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;
