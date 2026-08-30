import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '2px solid', borderColor: 'primary.light' }}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ py: 1.5, position: 'relative', justifyContent: 'center' }}>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box
              component="img"
              src="/tamil-sangam_logo.png"
              alt="Tamil Sangam Michigan"
              sx={{ height: { xs: 72, sm: 120 }, width: 'auto', maxWidth: '100%', display: 'block' }}
            />
          </Box>

          <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 2 }}>
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
