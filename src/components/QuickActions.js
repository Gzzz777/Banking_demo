import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickActions.css';

const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    { icon: '💳', title: 'Cards', desc: 'Apply for credit & debit cards' },
    { icon: '💰', title: 'Loans', desc: 'Personal & home loans' },
    { icon: '📊', title: 'Investments', desc: 'Mutual funds & FDs' },
    { icon: '📝', title: 'Grievance', desc: 'Register your complaint', link: '/grievance' }
  ];

  return (
    <section className="quick-actions">
      {actions.map((action, index) => (
        <div 
          key={index} 
          className="action-card" 
          onClick={() => action.link && navigate(action.link)}
          style={{ cursor: action.link ? 'pointer' : 'default' }}
        >
          <div className="icon">{action.icon}</div>
          <h3>{action.title}</h3>
          <p>{action.desc}</p>
        </div>
      ))}
    </section>
  );
};

export default QuickActions;
