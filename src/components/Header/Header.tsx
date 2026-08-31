import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useRole } from '../../auth/RoleContext';

export const Header: React.FC = () => {
  const role = useRole();
  const isAdmin = role === 'admin';

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

          {isAdmin && (
            <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
              <Typography
                component={Link}
                to="/reviews"
                variant="body2"
                fontWeight={600}
                sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                Reviews
              </Typography>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
