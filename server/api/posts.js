import mongoose from 'mongoose';
import { PostMessage } from '../models/postMessage.js';
import logger from '../utils/logger.js';

// MongoDB connection helper
async function connectDB() {
    try {
        if (mongoose.connections[0].readyState) {
            logger.debug('Reusing existing MongoDB connection');
            return;
        }
        logger.info('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URL);
        logger.info('Successfully connected to MongoDB');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        throw error;
    }
}

export default async function handler(req, res) {
    try {
        logger.info(`Handling ${req.method} request to /api/posts`);
        logger.debug('Request headers:', req.headers);
        logger.debug('Request body:', req.body);
        
        await connectDB();

        switch (req.method) {
            case 'GET':
                try {
                    logger.debug('Fetching all posts');
                    const postMessages = await PostMessage.find();
                    logger.info(`Successfully fetched ${postMessages.length} posts`);
                    res.status(200).json(postMessages);
                } catch (error) {
                    logger.error('Error fetching posts:', error);
                    res.status(404).json({ message: error.message });
                }
                break;

            case 'POST':
                try {
                    logger.debug('Creating new post:', req.body);
                    const post = req.body;
                    const newPost = new PostMessage(post);
                    await newPost.save();
                    logger.info('Successfully created new post with ID:', newPost._id);
                    res.status(201).json(newPost);
                } catch (error) {
                    logger.error('Error creating post:', error);
                    res.status(409).json({ message: error.message });
                }
                break;

            default:
                logger.warn(`Method ${req.method} not allowed`);
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).json({
                    error: 'Method Not Allowed',
                    message: `Method ${req.method} is not allowed for this endpoint`,
                    allowedMethods: ['GET', 'POST']
                });
        }
    } catch (error) {
        logger.error('Unhandled error in posts handler:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
} 