import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { Success } from './pages/Success/Success';
import { Reviews } from './pages/Reviews/Reviews';
import { About } from './pages/About/About';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#a0b4f8',
      dark: '#4a5fc1',
    },
    secondary: {
      main: '#764ba2',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
      dark: '#b45309',
    },
    success: {
      main: '#10b981',
    },
    background: {
      default: '#fafbff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Nunito", "Roboto", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 700,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
