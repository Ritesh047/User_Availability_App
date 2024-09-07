import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function ViewAvailability() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the selected slot from location state
  useEffect(() => {
    const fetchAvailabilityData = async () => {
      try {
        // Example API call to fetch selected slot data (adjust URL and parameters as needed)
        const response = await fetch(`/api/availability/${location.state?.selectedSlotId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setSelectedSlot(data);
      } catch (error) {
        console.error('Error fetching availability data:', error);
        setError('Failed to load availability data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilityData();
  }, [location.state?.selectedSlotId]);

  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" gutterBottom>
          Loading availability data...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Availability
        </Typography>
        <Typography variant="h6" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/schedule-session')}
        >
          Go Back to Scheduling
        </Button>
      </Paper>
    );
  }

  if (!selectedSlot) {
    return (
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Availability
        </Typography>
        <Typography variant="h6" gutterBottom>
          No availability data available. Please select an availability slot from the dashboard.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/schedule-session')}
        >
          Go Back to Scheduling
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Availability
      </Typography>
      <Typography variant="h6" gutterBottom>
        Availability Details
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={`${dayjs(selectedSlot.dateTime).format('DD/MM/YYYY')} - ${selectedSlot.day}: ${dayjs(selectedSlot.startTime).format('HH:mm')} - ${dayjs(selectedSlot.endTime).format('HH:mm')} (${selectedSlot.duration} minutes)`}
          />
        </ListItem>
      </List>
    </Paper>
  );
}

export default ViewAvailability;
