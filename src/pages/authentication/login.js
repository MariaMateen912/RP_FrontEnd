import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!credentials.username) tempErrors.username = "Username is required";
    if (!credentials.password) tempErrors.password = "Password is required";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      console.log(credentials);
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Login successful');
      
      // Store username and registration type in local storage
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("registrationType", response.data.user.registrationType);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("phoneNumber", response.data.user.phoneNumber);
  
      // Navigate based on registration type
      if (response.data.user.registrationType == 'Buyer') {
        router.push('/buyer');
      } else if (response.data.user.registrationType == 'Farmer') {
        router.push('/farmer');
      } else if (response.data.user.registrationType == 'Mandi Board') {
        router.push('/mandiBoard');
      }
  
    } catch (error) {
      console.error("Full error during login:", error);
      const serverError = error.response?.data?.error || "Login failed. Please try again.";
      setErrors({ general: serverError });
    }
  };
  
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 3,
      }}
    >
      <Box sx={{ width: 300, textAlign: 'center', mb: 3 }}>
        <Typography variant="h5">Login</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={credentials.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
        </Grid>

        {/* Display general error message */}
        {errors.general && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.general}
          </Typography>
        )}

        <Box sx={{ mt: 3, width: '100%' }}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
