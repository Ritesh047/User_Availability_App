import React from 'react';
import { Paper, Typography, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Admin Dashboard! Here you can manage user availability and schedule sessions.
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              View User Availability
            </Typography>
            <Typography variant="body2" paragraph>
              View and manage the availability of users. Select a user to see their available slots.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/view-availability"
            >
              View Availability
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Schedule Sessions
            </Typography>
            <Typography variant="body2" paragraph>
              Schedule sessions based on user availability. Choose a time slot and specify the session type.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              component={Link} 
              to="/schedule-session"
            >
              Schedule Session
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
          For more details, please refer to the documentation or contact support.
        </Typography>
      </Box>
    </Paper>
  );
}

export default Admin;
