import axios from 'axios'; //axios, to make api calls

const API = axios.create({ 
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://mern-project-reminisce.vercel.app/api'
        : 'http://localhost:5001/api',
    withCredentials: true
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);