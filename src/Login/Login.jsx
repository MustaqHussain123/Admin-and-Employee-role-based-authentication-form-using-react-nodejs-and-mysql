import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8082/login', { email, password });
      const { role } = response.data;

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'employee') {
        navigate('/employe');
      } else {
        setError('Unauthorized role');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className='container'>
      <Paper className='paper'>
        <Typography variant="h5" className='title'>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='textField'
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='textField'
          />
          {error && <Typography className='error'>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className='button'
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <Typography className='signup-link'>
            <a href='/signup'>Click to sign up</a>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;












