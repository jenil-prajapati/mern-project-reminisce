import mongoose from 'mongoose';
import { PostMessage } from '../models/postMessage.js';

// MongoDB connection helper
async function connectDB() {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URL);
}

export default async function handler(req, res) {
    await connectDB();

    switch (req.method) {
        case 'GET':
            try {
                const postMessages = await PostMessage.find();
                res.status(200).json(postMessages);
            } catch (error) {
                res.status(404).json({ message: error.message });
            }
            break;

        case 'POST':
            try {
                const post = req.body;
                const newPost = new PostMessage(post);
                await newPost.save();
                res.status(201).json(newPost);
            } catch (error) {
                res.status(409).json({ message: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 