import React from 'react';
import { useAuth } from '../context/AuthContext';
import Hero from '../components/Hero';
import QuickActions from '../components/QuickActions';
import Services from '../components/Services';
import Login from '../components/Login';
import AccountDashboard from '../components/AccountDashboard';
import Footer from '../components/Footer';

const Home = () => {
  const { userData } = useAuth();

  return (
    <>
      {userData ? (
        <>
          <AccountDashboard />
          <Services />
          <Footer />
        </>
      ) : (
        <>
          <Hero />
          <QuickActions />
          <Services />
          <Login />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
