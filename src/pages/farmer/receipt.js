import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { nanoid } from 'nanoid';
import html2pdf from 'html2pdf.js'; // Import html2pdf

const Receipt = () => {
  const router = useRouter();
  const [auctionDetails, setAuctionDetails] = useState({});
  const [auctionId, setAuctionId] = useState(nanoid());
  const [username, setUsername] = useState(null);
  const [details, setDetails] = useState();
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const { bidAmount, bidderUsername,  bidNumber,bidDate } = router.query;
  const receiptRef = useRef(); // Reference to the receipt content

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedBidDetails = localStorage.getItem('bidDetails');
    const parsedData = JSON.parse(storedBidDetails);
    setDetails(parsedData[0]);

    if (storedUsername) {
      setUsername(storedUsername);

      // Fetch the farmer's name and phone number from localStorage
      const storedFarmerName = localStorage.getItem('name');  // Assuming 'name' is the key for the farmer's name
      const storedFarmerPhone = localStorage.getItem('phoneNumber');  // Assuming 'phoneNumber' is the key for the farmer's phone
      if (storedFarmerName) setFarmerName(storedFarmerName);
      if (storedFarmerPhone) setFarmerPhone(storedFarmerPhone);
    } else {
      console.error('Username is missing in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      if (!username) return;

      try {
        const response = await axios.post('http://localhost:5000/api/auth/receipt', {
          username: username,
        });

        const selectedBid = response.data.selectedBid;
        setAuctionDetails(selectedBid);
      } catch (error) {
        console.error('Error fetching auction details:', error);
      }
    };

    if (username) {
      fetchAuctionDetails();
    }
  }, [username]);

  const downloadPDF = () => {
    const element = receiptRef.current; // Get the receipt content
    const options = {
      margin: 0.5,
      filename: `Auction_Receipt_${auctionId}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <Container>
      <Paper style={{ padding: '20px', marginTop: '20px' }} ref={receiptRef}>
        <Typography variant="h4" gutterBottom>
          Auction Receipt
        </Typography>

        <Typography variant="h6">Auction ID: {auctionId}</Typography>

        <Grid container spacing={2}>
          {/* Farmer's Details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Farmer's Name:</strong> {farmerName || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Farmer's Phone:</strong> {farmerPhone || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Bid Date:</strong> {bidDate ? new Date(bidDate).toLocaleDateString() : 'N/A'}
            </Typography>
          </Grid>

          {/* Buyer's Details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Buyer's Name:</strong> {bidderUsername || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Buyer's Phone:</strong> {bidNumber || 'N/A'}
            </Typography>
          </Grid>

          {/* Crop and Auction Details */}
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Crop Type:</strong> {details?.cropType || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Weight:</strong> {details?.weight || 'N/A'} kg
            </Typography>
            <Typography variant="body1">
              <strong>Mandi:</strong> {details?.mandi || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Bidding Amount:</strong> ₹{bidAmount || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Download Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={downloadPDF}
        style={{ marginTop: '20px' }}
      >
        Download as PDF
      </Button>
    </Container>
  );
};

export default Receipt;
