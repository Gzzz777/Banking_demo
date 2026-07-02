import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AccountsPage from './pages/AccountsPage';
import ContactPage from './pages/ContactPage';
import AccountOpeningPage from './pages/AccountOpeningPage';
import GrievancePage from './pages/GrievancePage';
import PersonalLoanPage from './pages/PersonalLoanPage';
import LoanApplicationPage from './pages/LoanApplicationPage';
import LoanTrackingPage from './pages/LoanTrackingPage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/account-opening" element={<AccountOpeningPage />} />
            <Route path="/grievance" element={<GrievancePage />} />
            <Route path="/personal-loans" element={<PersonalLoanPage />} />
            <Route path="/loan-application" element={<LoanApplicationPage />} />
            <Route path="/loan-tracking" element={<LoanTrackingPage />} />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
