import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { styled } from '@mui/material/styles';

import { LOGOUT } from '../../constants/actionTypes';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
}));

const StyledHeading = styled(Link)({
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
});

const StyledProfile = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '400px',
}));

const StyledUserName = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
});

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: LOGOUT });
        setUser(null);
        navigate('/auth');
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <StyledAppBar position="static" color="inherit">
            <StyledHeading to="/">
                <Typography variant="h4" align="center">Reminisce</Typography>
            </StyledHeading>
            <StyledToolbar>
                {user ? (
                    <StyledProfile>
                        <Avatar
                            alt={user.result.name}
                            src={user.result.picture}
                            sx={{ bgcolor: 'deepPurple.500' }}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <StyledUserName variant="h6">{user.result.name}</StyledUserName>
                        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </StyledProfile>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Navbar;
