import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, TextField, Button, Grid, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const durationOptions = [
  { label: '30 minutes', value: 30 },
  { label: '60 minutes', value: 60 },
  { label: '90 minutes', value: 90 },
  { label: '120 minutes', value: 120 },
];

function User() {
  const [availability, setAvailability] = useState({
    dateTime: null,
    day: '',
    startTime: null,
    endTime: null,
    duration: '30',
  });
  const [availabilityList, setAvailabilityList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const updateDay = (date) => {
    if (date) {
      const dayOfWeek = dayjs(date).format('dddd');
      setAvailability((prev) => ({
        ...prev,
        day: dayOfWeek,
      }));
    }
  };

  useEffect(() => {
    if (availability.startTime && availability.endTime) {
      const start = dayjs(availability.startTime);
      const end = dayjs(availability.endTime);
      const duration = end.diff(start, 'minute');

      const closestDuration = durationOptions.reduce((prev, curr) =>
        Math.abs(curr.value - duration) < Math.abs(prev.value - duration) ? curr : prev
      );

      setAvailability((prev) => ({
        ...prev,
        duration: closestDuration.value.toString(),
      }));
    }
  }, [availability.startTime, availability.endTime]);

  const handleStartTimeChange = (newStartTime) => {
    setAvailability((prev) => ({
      ...prev,
      startTime: newStartTime,
    }));
    updateDay(newStartTime);
  };

  const handleEndTimeChange = (newEndTime) => {
    setAvailability((prev) => ({
      ...prev,
      endTime: newEndTime,
    }));
    updateDay(newEndTime);
  };

  const handleAddOrUpdateAvailability = () => {
    const start = dayjs(availability.startTime);
    const end = dayjs(availability.endTime);
    
    if (!availability.startTime || !availability.endTime) {
      setErrorMessage('Please set both start time and end time.');
      return;
    }

    if (start.isAfter(end)) {
      setErrorMessage('End time must be after start time.');
      return;
    }

    if (editingIndex !== null) {
      const updatedAvailabilityList = [...availabilityList];
      updatedAvailabilityList[editingIndex] = availability;
      setAvailabilityList(updatedAvailabilityList);
      setEditingIndex(null);
    } else {
      setAvailabilityList([...availabilityList, availability]);
    }
    setAvailability({
      dateTime: null,
      day: '',
      startTime: null,
      endTime: null,
      duration: '30'
    });
    setErrorMessage('');
  };

  const handleEditAvailability = (index) => {
    const selectedAvailability = availabilityList[index];
    setAvailability(selectedAvailability);
    setEditingIndex(index);
  };

  const handleDeleteAvailability = (index) => {
    const newList = availabilityList.filter((_, i) => i !== index);
    setAvailabilityList(newList);
    if (editingIndex === index) {
      setEditingIndex(null);
      setAvailability({
        dateTime: null,
        day: '',
        startTime: null,
        endTime: null,
        duration: '30'
      });
    }
  };

  // Sort the availabilityList by startTime (upcoming first)
  const sortedAvailabilityList = availabilityList.slice().sort((a, b) => {
    return dayjs(a.startTime).isAfter(dayjs(b.startTime)) ? 1 : -1;
  });

  const isUpcoming = (startTime) => {
    return dayjs(startTime).isAfter(dayjs());
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Set Your Availability
      </Typography>
      <form>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Time"
                value={availability.startTime}
                onChange={handleStartTimeChange}
                renderInput={(params) => <TextField {...params} fullWidth required />}
                sx={{ mb: 2 }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Time"
                value={availability.endTime}
                onChange={handleEndTimeChange}
                renderInput={(params) => <TextField {...params} fullWidth required />}
                sx={{ mb: 2 }}
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
              sx={{ mb: 2 }}
            />
          </Grid>

          {errorMessage && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {errorMessage}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrUpdateAvailability}
              startIcon={<AddIcon />}
            >
              {editingIndex !== null ? 'Update Availability' : 'Add Availability'}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <List>
              {sortedAvailabilityList.map((slot, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: isUpcoming(slot.startTime) ? 'lightgreen' : 'lightgray',
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={`${
                      slot.startTime ? dayjs(slot.startTime).format('DD/MM/YYYY') : 'No Date'
                    } - ${slot.day}: ${dayjs(slot.startTime).format('HH:mm')} - ${dayjs(slot.endTime).format('HH:mm')} (${slot.duration} minutes)`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditAvailability(index)}
                    >
                      <EditIcon />
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
        </Grid>
      </form>
    </Paper>
  );
}

export default User;
