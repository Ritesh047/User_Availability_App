import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Chip } from '@mui/material';

function ScheduleSession() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sessionType, setSessionType] = useState('one-on-one');

  const handleUserChange = (event) => {
    const users = event.target.value;
    setSelectedUsers(users);
    setSessionType(users.length > 1 ? 'group' : 'one-on-one');
  };

  const handleSchedule = () => {
    // Implement scheduling logic here
    console.log('Scheduling session:', { selectedUsers, startTime, endTime, sessionType });
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Schedule a Session
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select User(s)</InputLabel>
            <Select
              label="Select User(s)"
              multiple
              value={selectedUsers}
              onChange={handleUserChange}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              <MenuItem value="user1">User 1</MenuItem>
              <MenuItem value="user2">User 2</MenuItem>
              <MenuItem value="user3">User 3</MenuItem>
              <MenuItem value="user4">User 4</MenuItem>
              {/* Add more users as needed */}
            </Select>
          </FormControl>
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
            value={sessionType}
            InputProps={{ readOnly: true }}
          />
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
