import React from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// List of Indian states and cities
const citiesByState = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Ziro', 'Pasighat', 'Bomdila'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tezpur'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Bhilai', 'Korba'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Solan', 'Mandi'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Manipur': ['Imphal', 'Churachandpur', 'Thoubal', 'Kakching', 'Senapati'],
  'Meghalaya': ['Shillong', 'Tura', 'Nongpoh', 'Jowai', 'Baghmara'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Zunheboto'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Puri'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Sikkim': ['Gangtok', 'Namchi', 'Geyzing', 'Mangan', 'Ravangla'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Ambassa'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Nainital', 'Haldwani'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
  'Andaman and Nicobar Islands': ['Port Blair'],
  'Chandigarh': ['Chandigarh'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Silvassa', 'Diu'],
  'Lakshadweep': ['Kavaratti'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
  'Ladakh': ['Leh', 'Kargil'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur']
};

const indianStates = Object.keys(citiesByState);

const validationSchema = Yup.object({
  registrationType: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  birthdate: Yup.date().required('Required').nullable(),
  phoneNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Phone number is not valid')
    .required('Required'),
  cityTehsil: Yup.string().required('Required'),
});

const Index = () => {
  const [cityOptions, setCityOptions] = React.useState([]);

  return (
    <Formik
      initialValues={{
        registrationType: '',
        state: '',
        name: '',
        birthdate: null,
        phoneNumber: '',
        cityTehsil: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h5">Registration</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                id="registrationType"
                name="registrationType"
                label="Registration Type"
                value={values.registrationType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.registrationType && Boolean(errors.registrationType)}
                helperText={touched.registrationType && errors.registrationType}
              >
                <MenuItem value="Farmer">Farmer</MenuItem>
                <MenuItem value="Govt">Govt</MenuItem>
                <MenuItem value="Mandi official">Mandi official</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                id="state"
                name="state"
                label="State"
                value={values.state}
                onChange={(e) => {
                  handleChange(e);
                  const selectedState = e.target.value;
                  setCityOptions(citiesByState[selectedState] || []);
                  setFieldValue('cityTehsil', ''); // Reset city selection
                }}
                onBlur={handleBlur}
                error={touched.state && Boolean(errors.state)}
                helperText={touched.state && errors.state}
              >
                {indianStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={values.birthdate}
                onChange={(date) => setFieldValue('birthdate', date)}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                customInput={
                  <TextField
                    fullWidth
                    id="birthdate"
                    name="birthdate"
                    error={touched.birthdate && Boolean(errors.birthdate)}
                    helperText={touched.birthdate && errors.birthdate}
                    label="Birthdate"
                  />
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                id="cityTehsil"
                name="cityTehsil"
                label="City/Tehsil"
                value={values.cityTehsil}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cityTehsil && Boolean(errors.cityTehsil)}
                helperText={touched.cityTehsil && errors.cityTehsil}
                disabled={!values.state} // Disable if no state selected
              >
                {cityOptions.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Index;
