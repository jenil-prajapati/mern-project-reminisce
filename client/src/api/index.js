import axios from 'axios'; //axios, to make api calls

const API = axios.create({ 
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://mern-project-reminisce.vercel.app/api'
        : 'http://localhost:5002/api'
});

// Add a request interceptor to add the auth token to requests
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// Posts endpoints
export const fetchPosts = () => API.get('/posts');
export const fetchMyPosts = () => API.get('/posts/mine');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/like`);

// Auth endpoints
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const googleSignIn = (credential) => API.post('/user/google', { credential });