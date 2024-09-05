import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const durationOptions = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
];

function User() {
  const [availability, setAvailability] = useState({
    date: null,
    day: '',
    startTime: '',
    endTime: '',
    duration: '30',
  });
  const [availabilityList, setAvailabilityList] = useState([]);
  const [upcomingSessions] = useState([]);

  useEffect(() => {
    if (availability.date) {
      const dayOfWeek = dayjs(availability.date).format('dddd');
      setAvailability((prev) => ({
        ...prev,
        day: dayOfWeek
      }));
    }
  }, [availability.date]);

  useEffect(() => {
    if (availability.startTime && availability.endTime) {
      const start = dayjs(availability.startTime, 'HH:mm');
      const end = dayjs(availability.endTime, 'HH:mm');
      const duration = end.diff(start, 'minute');

      // Automatically set duration to the closest valid option
      const closestDuration = durationOptions.reduce((prev, curr) => 
        Math.abs(curr.value - duration) < Math.abs(prev.value - duration) ? curr : prev
      );

      setAvailability((prev) => ({
        ...prev,
        duration: closestDuration.value.toString(),
      }));
    }
  }, [availability.startTime, availability.endTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value
    });
  };

  const handleDateChange = (newDate) => {
    setAvailability({
      ...availability,
      date: newDate,
    });
  };

  const handleAddAvailability = () => {
    setAvailabilityList([...availabilityList, availability]);
    setAvailability({
      date: null,
      day: '',
      startTime: '',
      endTime: '',
      duration: '30'
    });
  };

  const handleUpdateAvailability = (index) => {
    const updatedAvailability = { ...availabilityList[index], ...availability };
    const newList = [...availabilityList];
    newList[index] = updatedAvailability;
    setAvailabilityList(newList);
    setAvailability({
      date: null,
      day: '',
      startTime: '',
      endTime: '',
      duration: '30'
    });
  };

  const handleDeleteAvailability = (index) => {
    const newList = availabilityList.filter((_, i) => i !== index);
    setAvailabilityList(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Availability submitted:', availabilityList);
    // TODO: Implement actual submission logic
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Set Your Availability
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={availability.date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth required />}
                sx={{ mb: 2 }} // Add margin bottom for spacing
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="day"
              label="Day"
              value={availability.day}
              InputProps={{ readOnly: true }}
              fullWidth
              required
              sx={{ mb: 2 }} // Add margin bottom for spacing
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="startTime"
              label="Start Time"
              type="time"
              fullWidth
              value={availability.startTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              sx={{ mb: 2 }} // Add margin bottom for spacing
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="endTime"
              label="End Time"
              type="time"
              fullWidth
              value={availability.endTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              sx={{ mb: 2 }} // Add margin bottom for spacing
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="duration"
              label="Duration"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
              }}
              fullWidth
              value={availability.duration}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              disabled
              sx={{ mb: 2 }} // Add margin bottom for spacing
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddAvailability}
              startIcon={<AddIcon />}
            >
              Add Availability
            </Button>
          </Grid>
          <Grid item xs={12}>
            <List>
              {availabilityList.map((slot, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${
                      slot.date ? dayjs(slot.date).format('DD/MM/YYYY') : 'No Date'
                    } - ${slot.day}: ${slot.startTime} - ${slot.endTime} (${slot.duration} minutes)`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleUpdateAvailability(index)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteAvailability(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit Availability
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        Upcoming Scheduled Sessions
      </Typography>
      <List>
        {upcomingSessions.length > 0 ? (
          upcomingSessions.map((session, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Session with ${session.client} on ${session.date}`} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No upcoming sessions scheduled." />
          </ListItem>
        )}
      </List>
    </Paper>
  );
}

export default User;
