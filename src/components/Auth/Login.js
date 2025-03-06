import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';

const Login = ({ onLogin, switchToRegister }) => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          <Box mt={2}>
            <Button fullWidth variant="contained" type="submit">
              Login
            </Button>
            <Button fullWidth color="secondary" onClick={switchToRegister} sx={{ mt: 1 }}>
              Create New Account
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;