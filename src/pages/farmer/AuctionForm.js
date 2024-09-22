import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Snackbar, Alert } from '@mui/material';

const AuctionForm = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSnackbarClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      cropType: '',
      weight: '',
      mandi: '',
      arrivalDate: '',
      biddingAmount: '',
    },
    validationSchema: Yup.object({
      cropType: Yup.string().required('Crop type is required'),
      weight: Yup.number()
        .required('Weight is required')
        .min(1, 'Weight must be at least 1 kg'),
      mandi: Yup.string().required('Mandi is required'),
      arrivalDate: Yup.date()
        .min(new Date(), 'Arrival date must be in the future')
        .required('Arrival date is required')
        .nullable(),
      biddingAmount: Yup.number()
        .required('Bidding amount is required')
        .min(1, 'Bidding amount must be greater than 0'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true); // Start loading
      try {
        const response = await axios.post('http://localhost:5000/api/auth/auction', {
          ...values,
          username: localStorage.getItem('username'), // Get username from local storage
        }, {
          headers: {
            'Content-Type': 'application/json', // Ensure content type is JSON
          },
        });
        alert('Auction added successfully');
        resetForm();
      } catch (error) {
        console.error('Failed to add auction:', error);
        setErrorMessage(error.response?.data?.error || 'Failed to add auction');
        setOpen(true);
      } finally {
        setLoading(false); // Stop loading
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Crop to Auction
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="cropType"
              name="cropType"
              label="Crop Type"
              value={formik.values.cropType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cropType && Boolean(formik.errors.cropType)}
              helperText={formik.touched.cropType && formik.errors.cropType}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="weight"
              name="weight"
              label="Weight (in kg)"
              type="number"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="mandi"
              name="mandi"
              label="Mandi"
              value={formik.values.mandi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mandi && Boolean(formik.errors.mandi)}
              helperText={formik.touched.mandi && formik.errors.mandi}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="arrivalDate"
              name="arrivalDate"
              label="Arrival Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.arrivalDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.arrivalDate && Boolean(formik.errors.arrivalDate)}
              helperText={formik.touched.arrivalDate && formik.errors.arrivalDate}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="biddingAmount"
              name="biddingAmount"
              label="Starting Bid"
              type="number"
              value={formik.values.biddingAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.biddingAmount && Boolean(formik.errors.biddingAmount)}
              helperText={formik.touched.biddingAmount && formik.errors.biddingAmount}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading} // Disable when loading
            >
              {loading ? 'Adding Auction...' : 'Add Auction'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AuctionForm;
