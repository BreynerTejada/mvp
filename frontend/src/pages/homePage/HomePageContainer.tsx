import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomePageView from './HomePageView';

const HomePageContainer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToBooking = () => navigate('/agendar');
  const handleNavigateToServices = () => navigate('/servicios');
  const handleNavigateToBookingCTA = () => navigate('/agendar');

  return (
    <HomePageView
      onNavigateToBooking={handleNavigateToBooking}
      onNavigateToServices={handleNavigateToServices}
      onNavigateToBookingCTA={handleNavigateToBookingCTA}
    />
  );
};

export default HomePageContainer;
