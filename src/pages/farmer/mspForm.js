import React from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import axios from "axios";
// Define the validation schema using Yup
const validationSchema = Yup.object({
  year: Yup.string().required("Year is required"),
  cropType: Yup.string().required("Crop type is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
});

const years = ["2021", "2022", "2023", "2024"]; // Example years
const crops = ["Tomato", "Potato","Soyabean","Wheat"]; // Add more crops as needed

const MspForm = () => {
  return (
    <Box>
      <Header />
      <Formik
        initialValues={{ year: "", cropType: "", price: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const username = localStorage.getItem("username");

          const updatedValues = { ...values, username }; // Add name to the values object
          console.log("Form Data:", updatedValues);

          const response = await axios.post(
            "http://localhost:5000/api/auth/mspForm",
            updatedValues,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          console.log(response);
          alert("sucess");
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div style={{ marginBottom: 20 }}>
              <Field
                as={TextField}
                name="year"
                label="Year"
                select
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.year}
                error={touched.year && Boolean(errors.year)}
                helperText={touched.year && errors.year}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Field>
            </div>

            <div style={{ marginBottom: 20 }}>
              <Field
                as={TextField}
                name="cropType"
                label="Crop Type"
                select
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cropType}
                error={touched.cropType && Boolean(errors.cropType)}
                helperText={touched.cropType && errors.cropType}
              >
                {crops.map((crop) => (
                  <MenuItem key={crop} value={crop}>
                    {crop}
                  </MenuItem>
                ))}
              </Field>
            </div>

            <div style={{ marginBottom: 20 }}>
              <Field
                as={TextField}
                name="price"
                label="Price"
                type="number"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />
            </div>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default MspForm;
