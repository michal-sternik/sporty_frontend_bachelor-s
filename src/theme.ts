import { createTheme } from '@mui/material/styles';

const THEME = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Open Sans, sans-serif',
      textTransform: 'none',
      fontSize: 16,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976D2',
    },
    // secondary: {
    //   main: '#f50057',
    // },
    background: {
      default: '#2c2c2c',
      paper: '#202020',
    },
  },
});

export default THEME;
