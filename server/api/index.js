// Re-export the serverless handler from the main server entry point.
// This ensures all routes (posts, users, health) and middleware
// (body parsing, CORS, error handling) are available on Vercel.
export { default } from '../index.js';
