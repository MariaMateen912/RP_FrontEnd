import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [registrationType, setRegistrationType] = useState(null);
  const router = useRouter();

  const handleMSPNavigation = () => {
    router.push('/farmer/mspForm'); 
  };
  
  const handleAuctionNavigation = () => {
    router.push('/farmer/AuctionForm'); 
  };
  
  const handleVCalNavigation = () => {
    router.push('/farmer/VCalendar'); 
  };
  
  const handleFBidNavigation = () => {
    router.push('/farmer/BidsTable'); 
  };
  
  const handleBidNavigation = () => {
    router.push('/buyer/AuctionTable'); 
  };
  
  const handleVCalenNavigation = () => {
    router.push('/buyer/VCalendar'); 
  };

  const handleFCalNavigation = () => {
    router.push('/mandiBoard/FCalendar'); 
  };

  const handleUserNavigation = () => {
    router.push('/mandiBoard/user'); 
  };

  useEffect(() => {
    // Retrieve registration type from localStorage
    const storedUserType = localStorage.getItem('registrationType');
    setRegistrationType(storedUserType);
  }, []);

  return (
    <AppBar position="static" style={{ backgroundColor: '#4CAF50' }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">e-NAM Mandis</Button>
          {!registrationType ? (
            <>
              <Button color="inherit" onClick={handleVCalNavigation}>VCal</Button>
              <Button color="inherit" onClick={handleUserNavigation}>User</Button>
            </>
          ) : (
            <>
              {registrationType === 'Farmer' && (
                <>
                  <Button color="inherit" onClick={handleMSPNavigation}>MSP Form</Button>
                  <Button color="inherit" onClick={handleAuctionNavigation}>Auction Form</Button>
                  <Button color="inherit" onClick={handleFBidNavigation}>Bid Table</Button>
                  <Button color="inherit" onClick={handleVCalNavigation}>My Calendar</Button>
                </>
              )}
              {registrationType === 'Buyer' && (
                <>
                  <Button color="inherit" onClick={handleBidNavigation}>Auction Table</Button>
                  <Button color="inherit" onClick={handleVCalenNavigation}>My Calendar</Button>
                </>
              )}
              {registrationType === 'Mandi Board' && (
                <>
                  <Button color="inherit" onClick={handleFCalNavigation}>Calendar</Button>
                  <Button color="inherit" onClick={handleUserNavigation}>User</Button>
                </>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
