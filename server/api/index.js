import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PostMessage from '../models/postMessage.js';

dotenv.config();

// MongoDB connection
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// Helper to parse JWT token
const getTokenFromHeader = (req) => {
    try {
        return req.headers.authorization?.split(" ")[1] || null;
    } catch (error) {
        return null;
    }
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        await connectDB();

        // Extract the path from the URL
        const path = req.url.split('/api')[1] || '/';
        
        // Basic health check
        if (path === '/health') {
            return res.status(200).json({
                status: 'ok',
                message: 'Server is healthy',
                mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
            });
        }

        // Posts endpoints
        if (path === '/posts') {
            if (req.method === 'GET') {
                const posts = await PostMessage.find();
                return res.status(200).json(posts);
            }
            if (req.method === 'POST') {
                const post = req.body;
                const newPost = new PostMessage(post);
                await newPost.save();
                return res.status(201).json(newPost);
            }
        }

        // Single post endpoints
        if (path.match(/^\/posts\/[^/]+$/)) {
            const id = path.split('/')[2];
            
            if (req.method === 'PATCH') {
                const { id } = req.params;
                const post = req.body;
                const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
                return res.status(200).json(updatedPost);
            }
            
            if (req.method === 'DELETE') {
                await PostMessage.findByIdAndRemove(id);
                return res.status(200).json({ message: 'Post deleted successfully' });
            }
        }

        // Like post endpoint
        if (path.match(/^\/posts\/[^/]+\/like$/)) {
            const id = path.split('/')[2];
            const updatedPost = await PostMessage.findByIdAndUpdate(
                id,
                { $inc: { likeCount: 1 } },
                { new: true }
            );
            return res.status(200).json(updatedPost);
        }

        // If no route matches
        return res.status(404).json({ message: 'Not found' });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
} 