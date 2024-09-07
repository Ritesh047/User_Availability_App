import React, { useState } from 'react';
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
  // State to manage user availability data
  const [userAvailability] = useState({
    user1: [{ startTime: '2024-09-15T10:00', endTime: '2024-09-15T11:00' }],
    user2: [{ startTime: '2024-09-16T12:00', endTime: '2024-09-16T13:30' }],
    // Add more users and their availability data here
  });

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
              <Route path="/admin" element={<Admin userAvailability={userAvailability} />} />
              <Route path="/user" element={<User />} />
              <Route path="/schedule-session" element={<ScheduleSession userAvailability={userAvailability} />} />
              {/* Ensure that the path includes a userId parameter for dynamic routing */}
              <Route path="/view-availability/:userId" element={<ViewAvailability />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
