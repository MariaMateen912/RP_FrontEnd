import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Accordion, AccordionSummary, AccordionDetails, Card, CardContent } from "@mui/material";
import Header from '../components/Header';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Index() {
  const theme = useTheme();
  
  const [mspData, setMspData] = useState([]);

  useEffect(() => {
    // Function to fetch data
    const fetchMspData = async () => {
      try {
        // Make GET request to fetch the data
        const response = await axios.get('http://localhost:5000/api/auth/mspForm');
       console.log(response.data);
       
        setMspData(response.data);
      } catch (error) {
        console.error('Error fetching MSP data:', error);
      }
    };

    // Call the fetch function
    fetchMspData();
  }, []); 

  const groupedData = mspData.reduce((acc, curr) => {
    const { year, cropType, price } = curr;
    if (!acc[year]) acc[year] = {};
    if (!acc[year][cropType]) acc[year][cropType] = { total: 0, count: 0 };

    acc[year][cropType].total += price;
    acc[year][cropType].count += 1;

    return acc;
  }, {});

  return (
    <Box>
      <Header />
      <Box sx={{ mb: 2 }}> 
        <Navbar />
      </Box>
      <Carousel />
      <div>
      {Object.keys(groupedData).map((year) => (
        <Accordion key={year}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{year}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(groupedData[year]).map((cropType) => {
              const { total, count } = groupedData[year][cropType];
              const averagePrice = (total / count).toFixed(2);
              return (
                <Card key={cropType} sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{cropType}</Typography>
                    <Typography variant="body1">Average Price: ₹{averagePrice}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
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
