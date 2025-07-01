import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure middleware
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

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

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        await connectDB();
        res.status(200).json({
            status: 'ok',
            message: 'Server is healthy',
            mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server health check failed',
            error: error.message
        });
    }
});

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

app.get('/api', (req, res) => {
    res.send('Hello to Reminisce API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}

// Export the serverless function handler
export default async function handler(req, res) {
    try {
        await connectDB();
        return app(req, res);
    } catch (error) {
        return res.status(500).json({ 
            message: 'Server initialization failed', 
            error: error.message 
        });
    }
}
