import handler from '../index.js';

export default async function vercelHandler(req, res) {
    try {
        return await handler(req, res);
    } catch (error) {
        console.error('Vercel handler error:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
            stack: error.stack
        });
    }
}
