import mongoose from 'mongoose';
import { PostMessage } from '../../../models/postMessage.js';
import logger from '../../../utils/logger.js';

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
        const { id } = req.query;
        logger.info(`Handling ${req.method} request to /api/posts/${id}/like`);
        logger.debug('Request headers:', req.headers);

        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`Invalid post ID: ${id}`);
            return res.status(404).json({
                error: 'Not Found',
                message: 'Invalid post ID'
            });
        }

        if (req.method !== 'PATCH') {
            logger.warn(`Method ${req.method} not allowed`);
            res.setHeader('Allow', ['PATCH']);
            return res.status(405).json({
                error: 'Method Not Allowed',
                message: `Method ${req.method} is not allowed for this endpoint`,
                allowedMethods: ['PATCH']
            });
        }

        try {
            logger.debug(`Finding post ${id} to like`);
            const post = await PostMessage.findById(id);
            
            if (!post) {
                logger.warn(`Post not found with ID: ${id}`);
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Post not found'
                });
            }

            logger.debug(`Updating like count for post ${id}`);
            const updatedPost = await PostMessage.findByIdAndUpdate(
                id, 
                { likeCount: post.likeCount + 1 }, 
                { new: true }
            );
            
            logger.info(`Successfully liked post ${id}`);
            res.json(updatedPost);
        } catch (error) {
            logger.error(`Error liking post ${id}:`, error);
            res.status(409).json({ message: error.message });
        }
    } catch (error) {
        logger.error('Unhandled error in like handler:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
} 