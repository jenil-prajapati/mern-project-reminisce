import React, { useState, useEffect, useCallback } from 'react';
import { Box, Avatar, Button, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = useCallback(() => {
        dispatch({ type: LOGOUT });
        setUser(null);
        navigate('/');
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, logout, user?.token]);

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: { xs: '16px 20px', sm: '16px 40px' },
            borderBottom: '1px solid #f0f0f0',
            position: 'sticky', top: 0, zIndex: 100,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255,255,255,0.95)',
        }}>
            <Link to="/memories" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box sx={{
                    width: 36, height: 36, borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <AutoAwesomeIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Typography sx={{
                    fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e',
                    letterSpacing: '-0.02em',
                }}>
                    Reminisce
                </Typography>
            </Link>

            {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                            alt={user.result.name}
                            src={user.result.picture}
                            sx={{
                                width: 34, height: 34, fontSize: '0.875rem', fontWeight: 600,
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            }}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography sx={{
                            fontSize: '0.9rem', fontWeight: 500, color: '#52525b',
                            display: { xs: 'none', sm: 'block' },
                        }}>
                            {user.result.name}
                        </Typography>
                    </Box>
                    <Button
                        onClick={logout}
                        startIcon={<LogoutIcon sx={{ fontSize: '18px !important' }} />}
                        sx={{
                            textTransform: 'none', fontSize: '0.875rem', fontWeight: 500,
                            color: '#71717a', borderRadius: '10px', padding: '6px 14px',
                            '&:hover': { backgroundColor: '#fef3c7', color: '#d97706' },
                        }}
                    >
                        Sign out
                    </Button>
                </Box>
            ) : (
                <Button
                    component={Link} to="/auth"
                    sx={{
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: 'white', textTransform: 'none', borderRadius: '10px',
                        padding: '8px 24px', fontSize: '0.875rem', fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(217,119,6,0.25)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #d97706, #b45309)',
                            boxShadow: '0 4px 12px rgba(217,119,6,0.35)',
                        },
                    }}
                >
                    Sign In
                </Button>
            )}
        </Box>
    );
};

export default Navbar;
