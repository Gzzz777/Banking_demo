import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    { title: 'Account Opening', desc: 'Open savings or current account in minutes' },
    { title: 'Personal Loans', desc: 'Quick loans at attractive interest rates' },
    { title: 'Fund Transfer', desc: 'Instant NEFT, RTGS & IMPS transfers' },
    { title: 'Bill Payments', desc: 'Pay utility bills & recharge mobile' },
    { title: 'Fixed Deposits', desc: 'Secure investments with attractive rates' }
  ];

  const handleServiceClick = (title) => {
    if (title === 'Account Opening') {
      navigate('/account-opening');
    } else if (title === 'Personal Loans') {
      navigate('/personal-loans');
    }
  };

  return (
    <section className="services" id="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-item"
            onClick={() => handleServiceClick(service.title)}
          >
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
