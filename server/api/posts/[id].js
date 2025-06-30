import mongoose from 'mongoose';
import { PostMessage } from '../../models/postMessage.js';
import logger from '../../utils/logger.js';

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
        logger.info(`Handling ${req.method} request to /api/posts/${id}`);
        logger.debug('Request headers:', req.headers);
        logger.debug('Request body:', req.body);

        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`Invalid post ID: ${id}`);
            return res.status(404).json({
                error: 'Not Found',
                message: 'Invalid post ID'
            });
        }

        switch (req.method) {
            case 'PATCH':
                try {
                    logger.debug(`Updating post ${id} with:`, req.body);
                    const updatedPost = await PostMessage.findByIdAndUpdate(
                        id, 
                        { ...req.body, _id: id }, 
                        { new: true }
                    );
                    if (!updatedPost) {
                        logger.warn(`Post not found with ID: ${id}`);
                        return res.status(404).json({
                            error: 'Not Found',
                            message: 'Post not found'
                        });
                    }
                    logger.info(`Successfully updated post ${id}`);
                    res.json(updatedPost);
                } catch (error) {
                    logger.error(`Error updating post ${id}:`, error);
                    res.status(409).json({ message: error.message });
                }
                break;

            case 'DELETE':
                try {
                    logger.debug(`Deleting post ${id}`);
                    const deletedPost = await PostMessage.findByIdAndRemove(id);
                    if (!deletedPost) {
                        logger.warn(`Post not found with ID: ${id}`);
                        return res.status(404).json({
                            error: 'Not Found',
                            message: 'Post not found'
                        });
                    }
                    logger.info(`Successfully deleted post ${id}`);
                    res.json({ message: 'Post deleted successfully' });
                } catch (error) {
                    logger.error(`Error deleting post ${id}:`, error);
                    res.status(409).json({ message: error.message });
                }
                break;

            default:
                logger.warn(`Method ${req.method} not allowed`);
                res.setHeader('Allow', ['PATCH', 'DELETE']);
                res.status(405).json({
                    error: 'Method Not Allowed',
                    message: `Method ${req.method} is not allowed for this endpoint`,
                    allowedMethods: ['PATCH', 'DELETE']
                });
        }
    } catch (error) {
        logger.error('Unhandled error in post handler:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
} 