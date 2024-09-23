import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', password: '', phone: '', role: '' });

  useEffect(() => {
    axios.get(`http://localhost:8082/admin/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = () => {
    axios.put(`http://localhost:8082/admin/${id}`, user)
      .then(response => {
        console.log('User updated:', response.data);
        navigate('/admin');
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4">Edit User</Typography>
      <TextField
        label="Username"
        name="username"
        value={user.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        value={user.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Role"
        name="role"
        value={user.role}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Container>
  );
};

export default Edit;
