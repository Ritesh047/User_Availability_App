import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [roleError, setRoleError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    let valid = true;

    setRoleError('');
    setEmailError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email');
      valid = false;
    }

    if (!role) {
      setRoleError('Role is required');
      valid = false;
    } else if (!['admin', 'user'].includes(role.toLowerCase())) {
      setRoleError('Role must be either Admin or User');
      valid = false;
    }

    if (valid) {
      if (role.toLowerCase() === 'admin') {
        navigate('/admin');
      } else if (role.toLowerCase() === 'user') {
        navigate('/user');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: 'auto', mt: 10 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <TextField
          label="Role (Admin/User)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          error={Boolean(roleError)}
          helperText={roleError}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginPage;
