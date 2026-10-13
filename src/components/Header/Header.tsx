import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../auth/RoleContext';

export const Header: React.FC = () => {
  const role = useRole();
  const isAdmin = role === 'admin';
  const { pathname } = useLocation();

  // Determine which tab is active
  const activeTab = pathname === '/book-review' ? 1 : 0;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'white', borderBottom: '2px solid', borderColor: 'primary.light' }}
    >
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

        {/* Navigation tabs */}
        <Box sx={{ borderTop: '1px solid', borderColor: 'grey.100' }}>
          <Tabs
            value={activeTab}
            centered
            sx={{
              minHeight: 44,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 700,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                minHeight: 44,
                px: { xs: 1.5, sm: 3 },
                color: 'text.secondary',
              },
              '& .Mui-selected': {
                color: 'primary.main',
              },
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab
              label="📖 வீட்டுப்பாடம்"
              component={Link}
              to="/"
            />
            <Tab
              label="📚 புத்தக மதிப்புரை"
              component={Link}
              to="/book-review"
            />
          </Tabs>
        </Box>
      </Container>
    </AppBar>
  );
};
