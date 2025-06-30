export default function handler(req, res) {
    res.status(200).json({ 
        message: 'API is working!',
        env: process.env.NODE_ENV,
        mongodb: process.env.MONGODB_URL ? 'MongoDB URL is set' : 'MongoDB URL is missing'
    });
} 