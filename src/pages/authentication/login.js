import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
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

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, width: '100%' }}>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Login
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
