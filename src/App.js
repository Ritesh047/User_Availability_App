import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Admin from './pages/Admin';
import User from './pages/User';
import LoginPage from './pages/LoginPage';
import ViewAvailability from './pages/ViewAvailability';
import ScheduleSession from './pages/ScheduleSession';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Availability Application
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ my: 4 }}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element={<User />} />
              <Route path="/view-availability/:userId" element={<ViewAvailability />} />
              <Route path="/schedule-session" element={<ScheduleSession />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
