import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

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

// Validation schema using Yup
const validationSchema = Yup.object({
  registrationType: Yup.string().required("Registration type is required"),
  state: Yup.string().required("State is required"),
  name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
    .required("Name is required"),
  birthdate: Yup.date().required("Birthdate is required").nullable(),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  cityTehsil: Yup.string().required("City/Tehsil is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const RegistrationForm = () => {
  const [formValues, setFormValues] = useState({
    registrationType: "",
    state: "",
    name: "",
    birthdate: null,
    phoneNumber: "",
    email: "",
    cityTehsil: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [cityOptions, setCityOptions] = useState([]);
  const [generatedUsername, setGeneratedUsername] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormValues({ ...formValues, birthdate: date });
  };

  const handleBlur = async (e) => {
    const { name } = e.target;
    try {
      await Yup.reach(validationSchema, name).validate(formValues[name]);
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setFormErrors({});

      const response = await axios.post("http://localhost:5000/api/auth/reg", formValues, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setGeneratedUsername(response.data.username);
        localStorage.setItem("token", response.data.authoken);
        alert("Registration successful. Your username is " + response.data.username);
        router.push("/authentication/login");
      } else {
        alert("Registration failed. Please check your input.");
      }
    } catch (validationError) {
      if (validationError.inner) {
        const errorObj = validationError.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setFormErrors(errorObj);
      } else {
        console.log(validationError);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      state: selectedState,
      cityTehsil: "",
    }));
    setCityOptions(citiesByState[selectedState] || []);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5">Registration</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            name="registrationType"
            label="Registration Type"
            value={formValues.registrationType}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={Boolean(formErrors.registrationType)}
            helperText={formErrors.registrationType}
          >
            <MenuItem value="Farmer">Farmer</MenuItem>
            <MenuItem value="Buyer">Buyer</MenuItem>
            <MenuItem value="Mandi Board">Mandi official</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            name="state"
            label="State"
            value={formValues.state}
            onChange={handleStateChange}
            onBlur={handleBlur}
            error={Boolean(formErrors.state)}
            helperText={formErrors.state}
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
            name="name"
            label="Name"
            value={formValues.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={Boolean(formErrors.name)}
            helperText={formErrors.name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DatePicker
            selected={formValues.birthdate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            customInput={
              <TextField
                fullWidth
                label="Birthdate"
                onBlur={handleBlur}
                error={Boolean(formErrors.birthdate)}
                helperText={formErrors.birthdate}
              />
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={Boolean(formErrors.phoneNumber)}
            helperText={formErrors.phoneNumber}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="email"
            label="Email Id"
            value={formValues.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            name="cityTehsil"
            label="City/Tehsil"
            value={formValues.cityTehsil}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={Boolean(formErrors.cityTehsil)}
            helperText={formErrors.cityTehsil}
            disabled={!formValues.state}
          >
            {cityOptions.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
          />
        </Grid>
      </Grid>

      {generatedUsername && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Generated Username: {generatedUsername}</Typography>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default RegistrationForm;
