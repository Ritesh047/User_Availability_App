import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Button, Grid, MenuItem, Select, InputLabel, FormControl, Chip, Snackbar, Alert, List, ListItem, ListItemText, TextField
} from '@mui/material';
import dayjs from 'dayjs';

function ScheduleSession() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sessionType, setSessionType] = useState('one-on-one');
  const [successMessage, setSuccessMessage] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [errors, setErrors] = useState({});
  const [userAvailability, setUserAvailability] = useState({}); // To fetch user availability from API

  // Fetch user availability when component mounts
  useEffect(() => {
    // Fetch user availability from API
    // Example API call (adjust URL and method as needed)
    fetch('/api/user-availability')
      .then(response => response.json())
      .then(data => setUserAvailability(data))
      .catch(error => console.error('Error fetching user availability:', error));
  }, []);

  // Handle user selection and session type update
  const handleUserChange = (event) => {
    const users = event.target.value;
    setSelectedUsers(users);
    setSessionType(users.length > 1 ? 'group' : 'one-on-one');
  };

  // Validate inputs for session scheduling
  const validateInputs = () => {
    const newErrors = {};
    if (selectedUsers.length === 0) newErrors.users = 'At least one user must be selected';
    if (!startTime || !endTime) newErrors.time = 'Start time and end time are required';
    if (dayjs(startTime).isAfter(dayjs(endTime))) newErrors.time = 'Start time must be before end time';
    return newErrors;
  };

  // Handle scheduling of session and display success message
  const handleSchedule = () => {
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newSession = {
      id: sessions.length + 1,
      users: selectedUsers,
      startTime,
      endTime,
    };
    
    // Save the scheduled session via API
    // Example API call (adjust URL and method as needed)
    fetch('/api/schedule-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSession),
    })
      .then(response => response.json())
      .then(data => {
        setSessions([...sessions, newSession]);
        setSuccessMessage(true);
        setSelectedUsers([]);
        setStartTime('');
        setEndTime('');
        setErrors({});
      })
      .catch(error => {
        console.error('Error scheduling session:', error);
        setErrors({ ...errors, api: 'Failed to schedule the session. Please try again.' });
      });
  };

  // Close success message snackbar
  const handleCloseSnackbar = () => {
    setSuccessMessage(false);
  };

  // Format user availability for display
  const formatAvailability = (availability) => {
    return availability
      .map(({ startTime, endTime }) => `${dayjs(startTime).format('DD/MM/YYYY HH:mm')} - ${dayjs(endTime).format('HH:mm')}`)
      .join(', ');
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Schedule a Session
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={Boolean(errors.users)}>
            <InputLabel>Select User(s)</InputLabel>
            <Select
              label="Select User(s)"
              multiple
              value={selectedUsers}
              onChange={handleUserChange}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={`${value} (Available: ${formatAvailability(userAvailability[value])})`} />
                  ))}
                </div>
              )}
            >
              {Object.keys(userAvailability).map((userId) => (
                <MenuItem key={userId} value={userId}>
                  {userId} (Available: {formatAvailability(userAvailability[userId])})
                </MenuItem>
              ))}
            </Select>
            {errors.users && <Typography variant="caption" color="error">{errors.users}</Typography>}
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
            error={Boolean(errors.time)}
            helperText={errors.time}
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
            error={Boolean(errors.time)}
            helperText={errors.time}
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

      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        Upcoming Sessions
      </Typography>
      <List>
        {sessions.map((session) => (
          <ListItem key={session.id}>
            <ListItemText
              primary={`Users: ${session.users.join(', ')}`}
              secondary={`Time: ${session.startTime} - ${session.endTime}`}
            />
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          The session is scheduled successfully.
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ScheduleSession;
