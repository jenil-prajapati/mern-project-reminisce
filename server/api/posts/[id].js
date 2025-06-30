import mongoose from 'mongoose';
import { PostMessage } from '../../models/postMessage.js';

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

    switch (req.method) {
        case 'PATCH':
            try {
                const updatedPost = await PostMessage.findByIdAndUpdate(
                    id, 
                    { ...req.body, _id: id }, 
                    { new: true }
                );
                res.json(updatedPost);
            } catch (error) {
                res.status(409).json({ message: error.message });
            }
            break;

        case 'DELETE':
            try {
                await PostMessage.findByIdAndRemove(id);
                res.json({ message: 'Post deleted successfully' });
            } catch (error) {
                res.status(409).json({ message: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['PATCH', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 