import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@mui/material';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Auth from './components/Auth/Auth';
import { getPosts } from './actions/posts';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path="/" element={
                        <Grow in>
                            <Container>
                                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                                    <Grid item xs={12} sm={7}>
                                        <Posts setCurrentId={setCurrentId} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grow>
                    } />
                    <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;
