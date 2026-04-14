import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c4a35a',
      light: '#d4b36a',
      dark: '#a88d4a',
      contrastText: '#0d0d0d',
    },
    secondary: {
      main: '#2a2a2a',
      light: '#3a3a3a',
      dark: '#1a1a1a',
    },
    background: {
      default: '#0d0d0d',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    divider: 'rgba(196, 163, 90, 0.2)',
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: '3.5rem',
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0.02em',
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: '2rem',
    },
    h4: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: '10px 28px',
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          background: '#c4a35a',
          color: '#0d0d0d',
          '&:hover': {
            background: '#d4b36a',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 20px rgba(196, 163, 90, 0.4)',
          },
        },
        outlinedPrimary: {
          borderColor: '#c4a35a',
          color: '#c4a35a',
          '&:hover': {
            borderColor: '#d4b36a',
            backgroundColor: 'rgba(196, 163, 90, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(196, 163, 90, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(196, 163, 90, 0.4)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(196, 163, 90, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: '#c4a35a',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#c4a35a',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#c4a35a',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(13, 13, 13, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(196, 163, 90, 0.1)',
        },
      },
    },
  },
});

export default theme;
