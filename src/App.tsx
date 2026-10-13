import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { Success } from './pages/Success/Success';
import { Reviews } from './pages/Reviews/Reviews';
import { About } from './pages/About/About';
import { Homework } from './pages/Homework/Homework';
import { RoleProvider } from './auth/RoleContext';
import { getRole } from './auth/role';

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
  const role = getRole();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoleProvider role={role}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Homework />} />
            <Route path="/homework" element={<Navigate to="/" replace />} />
            <Route path="/book-review" element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </ThemeProvider>
  );
}

export default App;
