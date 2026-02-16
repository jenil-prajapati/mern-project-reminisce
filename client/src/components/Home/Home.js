import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogContent, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useDispatch, useSelector } from 'react-redux';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getMyPosts } from '../../actions/posts';

const Home = ({ currentId, setCurrentId }) => {
    const [formOpen, setFormOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch]);

    const handleOpenForm = () => {
        setCurrentId(null);
        setFormOpen(true);
    };

    const handleEditPost = (id) => {
        setCurrentId(id);
        setFormOpen(true);
    };

    const firstName = user?.result?.name?.split(' ')[0] || 'there';

    return (
        <Box>
            <Box sx={{
                position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #d97706 60%, #92400e 100%)',
                padding: { xs: '48px 20px', sm: '72px 40px', md: '80px 60px' },
                textAlign: 'center',
            }}>
                <Box sx={{
                    position: 'absolute', top: -60, right: -60, width: 200, height: 200,
                    borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
                }} />
                <Box sx={{
                    position: 'absolute', bottom: -40, left: -40, width: 160, height: 160,
                    borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
                }} />
                <Box sx={{
                    position: 'absolute', top: '30%', left: '15%', width: 80, height: 80,
                    borderRadius: '50%', background: 'rgba(255,255,255,0.04)',
                }} />

                <AutoAwesomeIcon sx={{ fontSize: 40, color: 'rgba(255,255,255,0.9)', mb: 2 }} />
                <Typography sx={{
                    fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
                    fontWeight: 700, color: 'white', mb: 1, letterSpacing: '-0.02em',
                    fontStyle: 'italic',
                }}>
                    My Memories
                </Typography>
                <Typography sx={{
                    fontSize: { xs: '1rem', sm: '1.15rem' },
                    color: 'rgba(255,255,255,0.85)', fontWeight: 400, maxWidth: 500, mx: 'auto',
                }}>
                    Welcome back, {firstName}. Here are the moments you've captured.
                </Typography>
            </Box>

            <Box sx={{
                maxWidth: 1100, mx: 'auto',
                padding: { xs: '24px 16px', sm: '32px 24px', md: '40px 32px' },
            }}>
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    mb: 3,
                }}>
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#3f3f46' }}>
                        {posts.length} {posts.length === 1 ? 'Memory' : 'Memories'}
                    </Typography>
                    <Button
                        onClick={handleOpenForm}
                        startIcon={<AddIcon />}
                        sx={{
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            color: 'white', textTransform: 'none', borderRadius: '12px',
                            padding: '8px 20px', fontSize: '0.875rem', fontWeight: 600,
                            boxShadow: '0 2px 10px rgba(217,119,6,0.25)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #d97706, #b45309)',
                                boxShadow: '0 4px 16px rgba(217,119,6,0.35)',
                            },
                        }}
                    >
                        New Memory
                    </Button>
                </Box>

                <Posts setCurrentId={handleEditPost} />
            </Box>

            <Dialog
                open={formOpen}
                onClose={() => { setFormOpen(false); setCurrentId(null); }}
                maxWidth="sm" fullWidth
                PaperProps={{
                    sx: { borderRadius: '20px', padding: 0, overflow: 'hidden' },
                }}
            >
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px 24px', borderBottom: '1px solid #f0f0f0',
                }}>
                    <Typography sx={{ fontSize: '1.15rem', fontWeight: 600, color: '#1a1a2e' }}>
                        {currentId ? 'Edit Memory' : 'New Memory'}
                    </Typography>
                    <IconButton onClick={() => { setFormOpen(false); setCurrentId(null); }} size="small">
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Box>
                <DialogContent sx={{ padding: '24px !important' }}>
                    <Form
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        onClose={() => setFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Home;
