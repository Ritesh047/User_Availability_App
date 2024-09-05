import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';

function ScheduleSession() {
  const [selectedUser, setSelectedUser] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sessionType, setSessionType] = useState('one-on-one');

  const handleSchedule = () => {
    // Implement scheduling logic here
    console.log('Scheduling session:', { selectedUser, startTime, endTime, sessionType });
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Schedule a Session
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Select User"
            fullWidth
            select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <MenuItem value="user1">User 1</MenuItem>
            <MenuItem value="user2">User 2</MenuItem>
            {/* Add more users as needed */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="End Time"
            type="time"
            fullWidth
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Session Type"
            fullWidth
            select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
          >
            <MenuItem value="one-on-one">One-on-One</MenuItem>
            <MenuItem value="group">Group</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSchedule}>
            Schedule Session
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ScheduleSession;
