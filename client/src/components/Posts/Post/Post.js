import React from 'react';
import { CardContent, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';
import {
    StyledCard,
    StyledMedia,
    StyledOverlay,
    StyledOverlay2,
    StyledDetails,
    StyledTitle,
    StyledCardActions
} from './styles';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?._id;
    const isCreator = userId === post?.creator;
    const hasLiked = post?.likes?.find((like) => like === userId);

    const Likes = () => {
        if (post.likes && post.likes.length > 0) {
            return hasLiked ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
            ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <StyledCard>
            <StyledMedia image={post.selectedFile || 'https://via.placeholder.com/300'} title={post.title} />
            <StyledOverlay>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </StyledOverlay>
            {isCreator && (
                <StyledOverlay2>
                    <Button
                        style={{ color: 'white' }}
                        size="small"
                        onClick={() => setCurrentId(post._id)}
                    >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </StyledOverlay2>
            )}
            <StyledDetails>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </StyledDetails>
            <StyledTitle>
                <Typography variant="h5" gutterBottom>{post.title}</Typography>
            </StyledTitle>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <StyledCardActions>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {isCreator && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}
            </StyledCardActions>
        </StyledCard>
    );
};

export default Post;
