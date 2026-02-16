import React from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?._id;
    const isCreator = userId === post?.creator;
    const hasLiked = post?.likes?.find((like) => like === userId);

    return (
        <Box sx={{
            backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden',
            border: '1px solid #f0f0f0', transition: 'all 0.25s ease',
            '&:hover': {
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                transform: 'translateY(-2px)',
            },
        }}>
            <Box sx={{ position: 'relative' }}>
                <Box
                    component="img"
                    src={post.selectedFile || 'https://via.placeholder.com/400x250?text=Memory'}
                    alt={post.title}
                    sx={{
                        width: '100%', height: 200, objectFit: 'cover',
                        display: 'block',
                    }}
                />
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%)',
                }} />
                <Box sx={{ position: 'absolute', top: 12, left: 14 }}>
                    <Typography sx={{ color: 'white', fontSize: '0.75rem', fontWeight: 500, opacity: 0.9 }}>
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                </Box>
                {isCreator && (
                    <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5 }}>
                        <IconButton
                            onClick={() => setCurrentId(post._id)}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
                                width: 32, height: 32,
                                '&:hover': { backgroundColor: 'white' },
                            }}
                        >
                            <EditOutlinedIcon sx={{ fontSize: 16, color: '#52525b' }} />
                        </IconButton>
                        <IconButton
                            onClick={() => dispatch(deletePost(post._id))}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
                                width: 32, height: 32,
                                '&:hover': { backgroundColor: '#fef2f2' },
                            }}
                        >
                            <DeleteOutlineIcon sx={{ fontSize: 16, color: '#ef4444' }} />
                        </IconButton>
                    </Box>
                )}
            </Box>

            <Box sx={{ padding: '16px' }}>
                {post.tags && post.tags.length > 0 && post.tags[0] !== '' && (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                        {post.tags.map((tag, i) => (
                            <Chip
                                key={i}
                                label={`#${tag.trim()}`}
                                size="small"
                                sx={{
                                    height: 24, fontSize: '0.7rem', fontWeight: 500,
                                    backgroundColor: '#fef3c7', color: '#92400e',
                                    border: 'none',
                                }}
                            />
                        ))}
                    </Box>
                )}

                <Typography sx={{
                    fontSize: '1.05rem', fontWeight: 600, color: '#1a1a2e',
                    mb: 0.5, lineHeight: 1.3,
                }}>
                    {post.title}
                </Typography>

                <Typography sx={{
                    fontSize: '0.85rem', color: '#71717a', mb: 1.5,
                    lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {post.message}
                </Typography>

                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '12px', borderTop: '1px solid #f5f5f5',
                }}>
                    <Typography sx={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 500 }}>
                        {post.name}
                    </Typography>

                    <Box
                        onClick={() => user?.result && dispatch(likePost(post._id))}
                        sx={{
                            display: 'flex', alignItems: 'center', gap: 0.5,
                            cursor: user?.result ? 'pointer' : 'default',
                            opacity: user?.result ? 1 : 0.5,
                            padding: '4px 10px', borderRadius: '8px',
                            transition: 'all 0.2s ease',
                            '&:hover': user?.result ? {
                                backgroundColor: hasLiked ? '#fef3c7' : '#f5f5f5',
                            } : {},
                        }}
                    >
                        {hasLiked ? (
                            <ThumbUpAltIcon sx={{ fontSize: 16, color: '#d97706' }} />
                        ) : (
                            <ThumbUpAltOutlined sx={{ fontSize: 16, color: '#a1a1aa' }} />
                        )}
                        <Typography sx={{
                            fontSize: '0.8rem', fontWeight: 500,
                            color: hasLiked ? '#d97706' : '#a1a1aa',
                        }}>
                            {post.likes?.length || 0}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Post;
