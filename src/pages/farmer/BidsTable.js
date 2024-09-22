import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

const BidsTable = () => {
  const router = useRouter();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDealNavigation = (bid) => {
   console.log(bid)
    router.push({
      pathname: 'receipt',
      query: {
        bidAmount: bid.bidAmount,
        bidderUsername: bid.buyerName,
        bidDate: bid.bidDate,
        bidNumber:bid.buyerPhone
      }
    });
  };

  useEffect(() => {
    const fetchBids = async () => {
      setLoading(true);
      try {
        const username = localStorage.getItem('username');
        const response = await axios.post('http://localhost:5000/api/auth/bids', {
          username: username, 
        });
        setBids(response?.data[0].bids);
        localStorage.setItem("bidDetails",JSON.stringify(response?.data))
        setError(null);
      } catch (error) {
        console.error('Failed to fetch bids:', error);
        setError('Failed to fetch bids. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, []);

  return (
    <Container>
      <h2>All Bids for Auction</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {bids.length === 0 && !loading ? <p>No bids found.</p> : null}

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bid Amount</TableCell>
              <TableCell>Bidder Username</TableCell>
              <TableCell>Bid Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bids.map((bid) => (
              <TableRow key={bid._id}>
                <TableCell>{bid.bidAmount}</TableCell>
                <TableCell>{bid.username}</TableCell>
                <TableCell>{new Date(bid.bidDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDealNavigation(bid)} // Pass the bid details when clicked
                  >
                    Confirm Deal
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

export default BidsTable;
