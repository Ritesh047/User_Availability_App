import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';

function ViewAvailability() {
  const { userId } = useParams();

  // Example user availability data
  const availability = [
    { date: '2024-08-30', startTime: '10:00', endTime: '10:30' },
    { date: '2024-08-30', startTime: '11:00', endTime: '11:30' },
    // Add more slots as needed
  ];

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Availability
      </Typography>
      <Typography variant="h6" gutterBottom>
        Availability for User ID: {userId}
      </Typography>
      <List>
        {availability.map((slot, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${slot.date} - ${slot.startTime} to ${slot.endTime}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ViewAvailability;
