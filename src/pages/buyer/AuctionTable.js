import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Container } from '@mui/material';
import axios from 'axios';

const AuctionTable = () => {
  const [auctions, setAuctions] = useState([]);
  const [filters, setFilters] = useState({
    cropType: '',
    mandi: '',
    date: '',
  });

  const [bidAmount, setBidAmount] = useState({});

  // Fetch auction data based on filters
  const fetchAuctions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/auction', {
        params: filters, // Send filters as query parameters
      });
      setAuctions(response.data);
    } catch (error) {
      console.error('Failed to fetch auctions:', error);
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle bid amount change for a particular auction
  const handleBidChange = (username, value) => {
    setBidAmount({ ...bidAmount, [username]: value });
  };

  // Handle bid submission for a particular auction
  const handleBidSubmit = async (auctionUsername) => {
    const buyerUsername = localStorage.getItem('username'); // Get buyer's username from localStorage
    const bidValue = bidAmount[auctionUsername];
    const buyerName = localStorage.getItem('name');
    const buyerPhone = localStorage.getItem('phoneNumber');
  
    if (!bidValue || !buyerUsername) {
      alert('Bid amount or buyer information is missing');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/bid', {
        auctionUsername,
        bidAmount: parseInt(bidValue, 10), // Ensure bidAmount is sent as a Number
        buyerUsername,
        buyerName,
        buyerPhone,
      });
  
      if (response.status === 201) {
        alert('Bid submitted successfully');
        setBidAmount((prev) => ({ ...prev, [auctionUsername]: '' }));
      }
    } catch (error) {
      console.error('Failed to submit bid:', error.response?.data || error.message);
      alert('Error submitting bid. Please check console for more details.');
    }
  };
  
  return (
    <Container>
      {/* Filter Section */}
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Crop Type"
          name="cropType"
          value={filters.cropType}
          onChange={handleFilterChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Mandi"
          name="mandi"
          value={filters.mandi}
          onChange={handleFilterChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={filters.date}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          style={{ marginRight: '10px' }}
        />
        <Button
          onClick={fetchAuctions}
          variant="contained"
          color="primary"
        >
          Apply Filters
        </Button>
      </div>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Crop Type</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Mandi</TableCell>
              <TableCell>Arrival Date</TableCell>
              <TableCell>Starting Bid</TableCell>
              <TableCell>Your Bid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auctions.map((auction) => (
              <TableRow key={auction.username}> {/* Use auction's username as key */}
                <TableCell>{auction.cropType}</TableCell>
                <TableCell>{auction.weight}</TableCell>
                <TableCell>{auction.mandi}</TableCell>
                <TableCell>{new Date(auction.arrivalDate).toLocaleDateString()}</TableCell>
                <TableCell>{auction.biddingAmount}</TableCell>
                <TableCell>
                  <TextField
                    label="Your Bid"
                    value={bidAmount[auction.username] || ''}
                    onChange={(e) => handleBidChange(auction.username, e.target.value)} // Change bid handling
                  />
                  <Button
                    onClick={() => handleBidSubmit(auction.username)} // Send auctionUsername
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '10px' }}
                  >
                    Submit Bid
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AuctionTable;
