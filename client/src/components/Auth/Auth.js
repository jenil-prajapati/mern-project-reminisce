import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';

import { signin, signup, googleSignIn } from '../../actions/auth';

const StyledPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(3),
}));

const StyledSubmit = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignup((prev) => !prev);
        setShowPassword(false);
    };

    const googleSuccess = (res) => {
        dispatch(googleSignIn(res?.credential, navigate));
    };

    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful.');
    };

    return (
        <Container component="main" maxWidth="xs">
            <StyledPaper elevation={3}>
                <StyledAvatar>
                    <LockOutlinedIcon />
                </StyledAvatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <StyledForm onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="firstName" label="First Name" onChange={handleChange} autoFocus fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="lastName" label="Last Name" onChange={handleChange} fullWidth />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <TextField name="email" label="Email Address" onChange={handleChange} type="email" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                label="Password"
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                            />
                        </Grid>
                        {isSignup && (
                            <Grid item xs={12}>
                                <TextField name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" fullWidth />
                            </Grid>
                        )}
                    </Grid>
                    <StyledSubmit type="submit" fullWidth variant="contained" color="primary">
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </StyledSubmit>
                    <Grid container justifyContent="center" sx={{ mb: 2 }}>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary">or</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" sx={{ mb: 2 }}>
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={googleFailure}
                        />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} size="small">
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </StyledForm>
            </StyledPaper>
        </Container>
    );
};

export default Auth;
