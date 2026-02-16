import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField, InputAdornment, IconButton, Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';

import { signin, signup, googleSignIn } from '../../actions/auth';

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

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px', backgroundColor: '#f8f8f8',
            '& fieldset': { borderColor: '#e5e5e5' },
            '&:hover fieldset': { borderColor: '#d97706' },
            '&.Mui-focused fieldset': { borderColor: '#d97706' },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: '#d97706' },
    };

    const features = [
        { icon: <CameraAltOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Capture Moments', desc: 'Save your favorite memories with photos and stories' },
        { icon: <FavoriteOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Personal Collection', desc: 'Your memories are private and belong only to you' },
        { icon: <PhotoLibraryOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Organize & Relive', desc: 'Tag and revisit the moments that matter most' },
    ];

    return (
        <Box sx={{
            minHeight: '100vh', display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
        }}>
            <Box sx={{
                flex: { xs: 'none', md: '1 1 50%' },
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #d97706 60%, #92400e 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: { xs: '48px 24px', sm: '60px 48px', md: '60px 64px' },
                position: 'relative', overflow: 'hidden',
            }}>
                <Box sx={{
                    position: 'absolute', top: -80, right: -80, width: 250, height: 250,
                    borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
                }} />
                <Box sx={{
                    position: 'absolute', bottom: -60, left: -60, width: 200, height: 200,
                    borderRadius: '50%', background: 'rgba(255,255,255,0.04)',
                }} />
                <Box sx={{
                    position: 'absolute', top: '40%', right: '20%', width: 100, height: 100,
                    borderRadius: '50%', background: 'rgba(255,255,255,0.03)',
                }} />

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                        <Box sx={{
                            width: 44, height: 44, borderRadius: '12px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <AutoAwesomeIcon sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
                            Reminisce
                        </Typography>
                    </Box>

                    <Typography sx={{
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' },
                        fontWeight: 700, color: 'white', lineHeight: 1.15, mb: 2,
                        letterSpacing: '-0.02em',
                    }}>
                        Keep the moments<br />that matter most.
                    </Typography>
                    <Typography sx={{
                        fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)',
                        mb: 5, maxWidth: 400, lineHeight: 1.6,
                    }}>
                        Your personal space to capture, collect, and revisit your favorite memories.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {features.map((f, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                <Box sx={{
                                    width: 40, height: 40, borderRadius: '10px',
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', flexShrink: 0,
                                }}>
                                    {f.icon}
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'white', mb: 0.25 }}>
                                        {f.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                                        {f.desc}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                flex: { xs: 'none', md: '1 1 50%' },
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: { xs: '40px 24px', sm: '48px' },
                backgroundColor: 'white',
            }}>
                <Box sx={{ width: '100%', maxWidth: 420 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
                            {isSignup ? 'Create Account' : 'Welcome Back'}
                        </Typography>
                        <Typography sx={{ fontSize: '0.95rem', color: '#71717a' }}>
                            {isSignup ? 'Start capturing your memories today' : 'Sign in to access your memories'}
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                                <TextField
                                    name="firstName" label="First Name" onChange={handleChange}
                                    fullWidth size="small" sx={inputStyles}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon sx={{ color: '#a1a1aa', fontSize: 20 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    name="lastName" label="Last Name" onChange={handleChange}
                                    fullWidth size="small" sx={inputStyles}
                                />
                            </Box>
                        )}
                        <TextField
                            name="email" label="Email" onChange={handleChange} type="email"
                            fullWidth size="small" sx={{ ...inputStyles, mb: 2 }}
                            placeholder="you@example.com"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon sx={{ color: '#a1a1aa', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            name="password" label="Password" onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            fullWidth size="small" sx={{ ...inputStyles, mb: isSignup ? 2 : 3 }}
                            placeholder="••••••••"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon sx={{ color: '#a1a1aa', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                            {showPassword
                                                ? <VisibilityOffOutlinedIcon sx={{ fontSize: 20, color: '#a1a1aa' }} />
                                                : <VisibilityOutlinedIcon sx={{ fontSize: 20, color: '#a1a1aa' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {isSignup && (
                            <TextField
                                name="confirmPassword" label="Confirm Password" onChange={handleChange}
                                type="password" fullWidth size="small" sx={{ ...inputStyles, mb: 3 }}
                                placeholder="••••••••"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon sx={{ color: '#a1a1aa', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        <Button
                            type="submit" fullWidth variant="contained"
                            sx={{
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                borderRadius: '12px', padding: '12px', textTransform: 'none',
                                fontSize: '1rem', fontWeight: 600,
                                boxShadow: '0 4px 14px rgba(217,119,6,0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #d97706, #b45309)',
                                    boxShadow: '0 6px 20px rgba(217,119,6,0.4)',
                                },
                            }}
                        >
                            {isSignup ? 'Create Account' : 'Sign In'}
                        </Button>
                    </form>

                    <Divider sx={{ my: 3, color: '#d4d4d8', fontSize: '0.8rem' }}>or continue with</Divider>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={googleFailure}
                            shape="pill"
                            theme="outline"
                            size="large"
                            width="360"
                        />
                    </Box>

                    <Typography sx={{ textAlign: 'center', fontSize: '0.875rem', color: '#71717a' }}>
                        {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                        <Box
                            component="span" onClick={switchMode}
                            sx={{
                                color: '#d97706', fontWeight: 600, cursor: 'pointer',
                                '&:hover': { color: '#b45309', textDecoration: 'underline' },
                            }}
                        >
                            {isSignup ? 'Sign In' : 'Sign Up'}
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Auth;
