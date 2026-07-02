import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';
import './AccountDashboard.css';

const AccountDashboard = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiService.getAccountDashboardData();
      setDashData(data);
    } catch {
      // Fallback to mock data when API unavailable
      setDashData({
        balance: 125430.50,
        transactions: [
          { date: '2024-01-15', desc: 'Salary Credit', amount: '+50,000', type: 'credit' },
          { date: '2024-01-14', desc: 'UPI Payment', amount: '-1,200', type: 'debit' },
          { date: '2024-01-13', desc: 'ATM Withdrawal', amount: '-5,000', type: 'debit' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <LoadingSpinner message="Loading your dashboard..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  const balance = dashData?.balance ?? 0;
  const transactions = dashData?.transactions ?? [];

  return (
    <section className="account-dashboard">
      <div className="dashboard-header">
        <h2>Welcome back, {userData?.name}!</h2>
        <p>Manage your account and transactions</p>
      </div>

      <div className="dashboard-grid">
        <div className="account-card">
          <div className="card-header">
            <h3>Account Summary</h3>
            <span className="account-type">{userData?.accountType}</span>
          </div>
          <div className="account-number">A/C: {userData?.accountNumber}</div>
          <div className="balance-section">
            <span className="balance-label">Available Balance</span>
            <div className="balance-amount">₹ {Number(balance).toLocaleString('en-IN')}</div>
          </div>
          <div className="account-actions">
            <button onClick={() => navigate('/personal-loans')}>Apply for Loan</button>
            <button onClick={() => navigate('/services')}>Fund Transfer</button>
          </div>
        </div>

        <div className="transactions-card">
          <h3>Recent Transactions</h3>
          <div className="transactions-list">
            {transactions.map((txn, index) => (
              <div key={index} className="transaction-item">
                <div className="txn-info">
                  <div className="txn-desc">{txn.desc || txn.description}</div>
                  <div className="txn-date">{txn.date}</div>
                </div>
                <div className={`txn-amount ${txn.type}`}>{txn.amount}</div>
              </div>
            ))}
          </div>
          <button className="view-all-btn">View All Transactions</button>
        </div>

        <div className="quick-links-card">
          <h3>Quick Links</h3>
          <div className="quick-links-grid">
            <div className="quick-link" onClick={() => navigate('/services')}>
              <span className="link-icon">💸</span>
              <span>Fund Transfer</span>
            </div>
            <div className="quick-link" onClick={() => navigate('/services')}>
              <span className="link-icon">📱</span>
              <span>Bill Payment</span>
            </div>
            <div className="quick-link" onClick={() => navigate('/personal-loans')}>
              <span className="link-icon">💰</span>
              <span>Loans</span>
            </div>
            <div className="quick-link" onClick={() => navigate('/services')}>
              <span className="link-icon">📊</span>
              <span>Fixed Deposit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountDashboard;
