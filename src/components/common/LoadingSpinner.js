import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="loading-spinner-wrapper">
    <div className="loading-spinner" />
    <p>{message}</p>
  </div>
);

export default LoadingSpinner;
