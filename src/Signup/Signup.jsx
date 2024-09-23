import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css";
import Aos from 'aos';
import 'aos/dist/aos.css'
 
export default function SignupForm() {
    useEffect(()=>{
        Aos.init()
    })

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/'); 
    };

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        role: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8082/signup', values)
            .then(res => {
                console.log("Registration successfully!!:", res);
                navigate('/');
                alert("Signed up successfully!!");
            })
            .catch(err => {
                console.error("Registration failed:", err);
                alert("Registration failed");
            });
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const top100Roles = [
        { label: 'admin' },
        { label: 'employee' },
    ];

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="signup-form"
            noValidate
            autoComplete="off"
            data-aos="fade-up"
            data-aos-duration="2000"
        >
            <h2>Sign Up</h2>
            <TextField
                helperText="Please enter your name"
                id="username"
                name="username"
                value={values.username}
                onChange={e => setValues({ ...values, username: e.target.value })}
                label="Username"
                fullWidth
            />
            <TextField
                helperText="Please enter your email"
                id="email"
                name="email"
                value={values.email}
                onChange={e => setValues({ ...values, email: e.target.value })}
                label="Email"
                fullWidth
            />
            <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={e => setValues({ ...values, password: e.target.value })}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Confirm Password"
                />
            </FormControl>
            <TextField
                id="phone"
                name="phone"
                value={values.phone}
                onChange={e => setValues({ ...values, phone: e.target.value })}
                label="Phone Number"
                type="number"
                fullWidth
            />
            <Autocomplete
                disablePortal
                id="role"
                name="role"
                value={values.role}
                onChange={(event, newValue) => setValues(prevValues => ({ ...prevValues, role: newValue?.label || '' }))}
                options={top100Roles}
                sx={{ width: '100%', mb: 2 }}
                renderInput={(params) => <TextField {...params} label="Role" />}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
            >
                Sign Up
            </Button>
            <p>Already Registered? <span onClick={handleClick} style={{ color: 'blue', cursor: 'pointer' }}>Login here</span></p>
        </Box>
    );
}


