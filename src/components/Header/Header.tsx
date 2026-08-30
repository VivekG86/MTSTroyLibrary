import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '2px solid', borderColor: 'primary.light' }}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 1.5 }}>
            <Box sx={{
              bgcolor: 'primary.main',
              borderRadius: 2,
              p: 0.75,
              display: 'flex',
              alignItems: 'center',
            }}>
              <MenuBookIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={800} color="primary.main" lineHeight={1.1}>
                Troy Library
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Community Book Reviews
              </Typography>
            </Box>
          </Box>

          <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
            <Typography
              component={Link}
              to="/reviews"
              variant="body2"
              fontWeight={600}
              sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Reviews
            </Typography>
            <Typography
              component={Link}
              to="/about"
              variant="body2"
              fontWeight={600}
              sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              About
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
