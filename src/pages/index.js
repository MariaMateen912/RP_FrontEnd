import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Router from 'next/router';

function Index() {
  const theme = useTheme();
  

 

  return (
    <Box>
      <Header />
      <Box sx={{ mb: 2 }}> 
        <Navbar />
      </Box>
      <Carousel />
      <Box
        sx={{
          padding: theme.spacing(4),
          backgroundColor: "theme.palette.background.paper",
          marginTop: theme.spacing(4),
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Paper elevation={3} sx={{ padding: theme.spacing(4) }}>
          <Typography variant="h4" sx={{ marginBottom: theme.spacing(2), fontWeight: 'bold' }}>
            About eNAM and Minimum Support Price (MSP)
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: theme.spacing(2) }}>
            The eNAM (National Agriculture Market) website is an innovative initiative by the government of India that integrates the existing Agricultural Produce Market Committees (APMCs) across the country. This platform enables farmers to sell their produce directly to buyers online, ensuring transparency, efficiency, and fair pricing.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: theme.spacing(2) }}>
            The Minimum Support Price (MSP) is a crucial aspect of agricultural pricing in India. It is the price at which the government purchases crops from farmers, ensuring they receive a minimum profit for their produce. The MSP aims to protect farmers from price fluctuations in the market and provides them with a safety net.
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: theme.spacing(2), fontWeight: 'bold' }}>
            How Farmers Can Contribute
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: theme.spacing(2) }}>
            With the new feature added to our platform, farmers can now actively participate in price discovery by suggesting prices for their produce. These suggestions are aggregated and the average price is displayed on our website, giving farmers a voice in the pricing process and helping them stay informed about current market trends.
          </Typography>
          <Typography variant="body1">
            By contributing to this system, farmers can ensure that their interests are represented, and they can help create a more transparent and fair agricultural market.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Index;
