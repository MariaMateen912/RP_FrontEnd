// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f1f8e9', // Example primary color
    },
    secondary: {
      main: '#689f38', // Example secondary color
    },
    bcolor:{
main:'#ef6c00'
    },
    background:{
      main:"#eeeeee"
    }
    // Add more colors as needed
  },
  // Add other customizations if necessary
});

export default theme;
