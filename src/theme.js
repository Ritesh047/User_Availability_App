import { createTheme } from '@mui/material/styles';

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color
    },
    secondary: {
      main: '#ff4081', // Pink color
    },
    error: {
      main: '#d32f2f', // Red color for error messages
    },
    warning: {
      main: '#f57c00', // Orange color for warnings
    },
    info: {
      main: '#0288d1', // Light blue color for informational messages
    },
    success: {
      main: '#388e3c', // Green color for success messages
    },
    background: {
      default: '#f5f5f5', // Light grey background for the app
      paper: '#ffffff', // White background for Paper components
    },
    text: {
      primary: '#000000', // Primary text color
      secondary: '#555555', // Secondary text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  },
  spacing: 8, // Default spacing unit of 8px
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
