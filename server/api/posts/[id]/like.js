import mongoose from 'mongoose';
import { PostMessage } from '../../../models/postMessage.js';

async function connectDB() {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URL);
}

export default async function handler(req, res) {
    const { id } = req.query;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }

    if (req.method !== 'PATCH') {
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const post = await PostMessage.findById(id);
        const updatedPost = await PostMessage.findByIdAndUpdate(
            id, 
            { likeCount: post.likeCount + 1 }, 
            { new: true }
        );
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
} 