import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';

import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);

    if (!posts || !Array.isArray(posts)) {
        return (
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '60px 20px',
            }}>
                <CircularProgress sx={{ color: '#d97706', mb: 2 }} size={36} />
                <Typography sx={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
                    Loading your memories...
                </Typography>
            </Box>
        );
    }

    if (posts.length === 0) {
        return (
            <Box sx={{
                textAlign: 'center', padding: '60px 20px',
                backgroundColor: 'white', borderRadius: '16px',
                border: '2px dashed #e5e5e5',
            }}>
                <PhotoLibraryOutlinedIcon sx={{ fontSize: 48, color: '#d4d4d8', mb: 2 }} />
                <Typography sx={{ fontSize: '1.1rem', color: '#52525b', fontWeight: 600, mb: 0.5 }}>
                    No memories yet
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: '#a1a1aa' }}>
                    Capture your first moment by clicking "New Memory" above.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
            },
            gap: 3,
        }}>
            {posts.map((post) => (
                <Post key={post._id} post={post} setCurrentId={setCurrentId} />
            ))}
        </Box>
    );
};

export default Posts;
