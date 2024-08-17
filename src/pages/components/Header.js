import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Button, Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  const handleRegNavigation = () => {
    router.push('/authentication'); // Navigate to registration page
  };
  
  const handleLoginNavigation = () => {
    router.push('/authentication/login'); // Navigate to login page
  };

  return (
    <AppBar position="static" color="background" sx={{ boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={3}>
            <Box display="flex" alignItems="center">
              <Image
                src="/government-logo.png"
                alt="Government of India Logo"
                width={100} // Reduced width
                height={120} // Reduced height
              />
              <Box ml={1}>
                <Typography variant="body2" color="textPrimary" gutterBottom>
                  GOVERNMENT OF INDIA
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Small Farmers Agri-Business Consortium<br/>
                  Department of Agriculture & Farmers Welfare
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="center">
            <Box display="flex" alignItems="center">
              <Image
                src="/enam-logo.jpg"
                alt="eNAM Logo"
                width={150} // Reduced width
                height={150} // Reduced height
              />
              <Box ml={1}>
                <Typography variant="h6" color="textPrimary">
                  NATIONAL AGRICULTURE MARKET
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3} display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body2" color="textPrimary">
              Call us 1800 270 0224
            </Typography>
            <Box mt={1}>
              <Button variant="contained" color="secondary" onClick={handleRegNavigation} sx={{ textTransform: 'none', mb: 1 ,mr:2}}>
                Registration
              </Button>
              <Button variant="contained" color="secondary" onClick={handleLoginNavigation} sx={{ textTransform: 'none' }}>
                Login Here
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
