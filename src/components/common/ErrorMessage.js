import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message = 'Something went wrong.', onRetry }) => (
  <div className="error-message-wrapper">
    <span className="error-icon">⚠️</span>
    <p>{message}</p>
    {onRetry && <button className="retry-btn" onClick={onRetry}>Retry</button>}
  </div>
);

export default ErrorMessage;
