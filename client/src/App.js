import React, { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Box sx={{ minHeight: '100vh', backgroundColor: '#faf9f7' }}>
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/memories" /> : <Auth />} />
                    <Route path="/auth" element={user ? <Navigate to="/memories" /> : <Auth />} />
                    <Route path="/memories" element={
                        user ? (
                            <>
                                <Navbar />
                                <Home currentId={currentId} setCurrentId={setCurrentId} />
                            </>
                        ) : (
                            <Navigate to="/" />
                        )
                    } />
                </Routes>
            </Box>
        </BrowserRouter>
    );
};

export default App;
