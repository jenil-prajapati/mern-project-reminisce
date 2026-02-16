import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId, onClose }) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user?.result?.name) return;

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
        if (onClose) onClose();
    };

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px', backgroundColor: '#fafafa',
            '& fieldset': { borderColor: '#e5e5e5' },
            '&:hover fieldset': { borderColor: '#d97706' },
            '&.Mui-focused fieldset': { borderColor: '#d97706' },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: '#d97706' },
    };

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    name="title" label="Title" fullWidth size="small"
                    value={postData.title} sx={inputStyles}
                    placeholder="Give your memory a title"
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message" label="Message" fullWidth size="small"
                    value={postData.message} sx={inputStyles}
                    placeholder="What happened? Tell the story..."
                    multiline rows={3}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags" label="Tags" fullWidth size="small"
                    value={postData.tags} sx={inputStyles}
                    placeholder="travel, adventure, fun (comma separated)"
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />

                <Box sx={{
                    border: '2px dashed #e5e5e5', borderRadius: '12px',
                    padding: '16px', textAlign: 'center',
                    backgroundColor: '#fafafa', transition: 'all 0.2s',
                    '&:hover': { borderColor: '#d97706', backgroundColor: '#fffbeb' },
                }}>
                    <ImageOutlinedIcon sx={{ fontSize: 28, color: '#a1a1aa', mb: 0.5 }} />
                    <Typography sx={{ fontSize: '0.8rem', color: '#71717a', mb: 1 }}>
                        Upload an image for your memory
                    </Typography>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </Box>

                {postData.selectedFile && (
                    <Box sx={{ borderRadius: '12px', overflow: 'hidden', maxHeight: 150 }}>
                        <Box
                            component="img"
                            src={postData.selectedFile}
                            alt="Preview"
                            sx={{ width: '100%', height: 150, objectFit: 'cover' }}
                        />
                    </Box>
                )}

                <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
                    <Button
                        onClick={() => { clear(); if (onClose) onClose(); }}
                        fullWidth
                        sx={{
                            borderRadius: '12px', padding: '10px', textTransform: 'none',
                            fontSize: '0.9rem', fontWeight: 500, color: '#71717a',
                            border: '1px solid #e5e5e5',
                            '&:hover': { backgroundColor: '#f5f5f5', borderColor: '#d4d4d8' },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit" fullWidth variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            borderRadius: '12px', padding: '10px', textTransform: 'none',
                            fontSize: '0.9rem', fontWeight: 600,
                            boxShadow: '0 2px 10px rgba(217,119,6,0.25)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #d97706, #b45309)',
                                boxShadow: '0 4px 16px rgba(217,119,6,0.35)',
                            },
                        }}
                    >
                        {currentId ? 'Update' : 'Create Memory'}
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default Form;
