import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Successfully connected to MongoDB!');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

testConnection(); 