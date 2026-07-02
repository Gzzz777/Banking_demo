import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './ServicesPage.css';

const defaultServices = [
  { title: 'Account Opening', desc: 'Open savings or current account in minutes', icon: '🏦', route: '/account-opening' },
  { title: 'Personal Loans', desc: 'Quick loans at attractive interest rates', icon: '💰', route: '/personal-loans' },
  { title: 'Fund Transfer', desc: 'Instant NEFT, RTGS & IMPS transfers', icon: '💸', route: null },
  { title: 'Bill Payments', desc: 'Pay utility bills & recharge mobile', icon: '📱', route: null },
  { title: 'Fixed Deposits', desc: 'Secure investments with attractive rates', icon: '📊', route: null },
  { title: 'Credit Cards', desc: 'Apply for credit cards with exclusive benefits', icon: '💳', route: null },
  { title: 'Insurance', desc: 'Life and health insurance plans', icon: '🛡️', route: null },
  { title: 'Demat Account', desc: 'Open demat account for trading', icon: '📈', route: null }
];

const ServicesPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiService.getBankingServices();
      setServices(data?.services || data || defaultServices);
    } catch {
      setServices(defaultServices);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  if (loading) return <LoadingSpinner message="Loading services..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchServices} />;

  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Our Banking Services</h1>
        <p>Comprehensive banking solutions for all your financial needs</p>
      </div>
      <div className="services-container">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-box"
            onClick={() => service.route && navigate(service.route)}
            style={{ cursor: service.route ? 'pointer' : 'default' }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc || service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
