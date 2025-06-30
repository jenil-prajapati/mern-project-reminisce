export default function handler(req, res) {
    return res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: {
            node_env: process.env.NODE_ENV,
            mongodb_url_set: !!process.env.MONGODB_URL
        }
    });
} 