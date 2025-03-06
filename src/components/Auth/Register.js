import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';

const Register = ({ onRegister, switchToLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(credentials);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit}>
          {/* Similar structure to Login with confirm password field */}
          <Button fullWidth variant="contained" type="submit">
            Register
          </Button>
          <Button fullWidth color="secondary" onClick={switchToLogin} sx={{ mt: 1 }}>
            Already have an account?
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;