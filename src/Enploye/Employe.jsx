// EmployeeViewer.js
import React from 'react';
import { Container, Typography, Paper, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import './Employe.css'; 

const EmployeeViewer = () => {
  
  const employee = {
    name: 'mustaq',
    email: 'mustaq@gmail.com',
    phone: '+1234567890',
  };

  const tasks = [
    { id: 1, title: 'Complete project report', description: 'Finalize the report for the client.' },
    { id: 2, title: 'Fix bugs in application', description: 'Resolve critical bugs reported by QA.' },
  ];

  const meetings = [
    { id: 1, title: 'Team Meeting', date: '2024-08-01', time: '10:00 AM' },
    { id: 2, title: 'Client Call', date: '2024-08-02', time: '2:00 PM' },
  ];

  return (
    <Container className="container">
      <Typography variant="h2" className="header" gutterBottom>
        Employee Viewer
      </Typography>

      <Paper className="paper">
        <Typography variant="h4" gutterBottom>
          Personal Information
        </Typography>
        <Typography><strong>Name:</strong> {employee.name}</Typography>
        <Typography><strong>Email:</strong> {employee.email}</Typography>
        <Typography><strong>Phone:</strong> {employee.phone}</Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="paper tasks">
            <Typography variant="h4" gutterBottom>
              Tasks
            </Typography>
            <List>
              {tasks.map((task) => (
                <ListItem key={task.id} className="task-item">
                  <ListItemText primary={task.title} secondary={task.description} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="paper meetings">
            <Typography variant="h4" gutterBottom>
              Upcoming Meetings
            </Typography>
            <List>
              {meetings.map((meeting) => (
                <ListItem key={meeting.id} className="meeting-item">
                  <ListItemText
                    primary={meeting.title}
                    secondary={`Date: ${meeting.date}, Time: ${meeting.time}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Button variant="contained" className="button">
        Edit Profile
      </Button>
    </Container>
  );
};

export default EmployeeViewer;



