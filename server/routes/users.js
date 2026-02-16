import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.js';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        if (!existingUser.password) {
            return res.status(400).json({ message: "This account uses Google Sign-In. Please sign in with Google." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error('Sign in error:', error);
        res.status(500).json({ message: "Something went wrong." });
    }
});

router.post('/signup', async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({ result, token });
    } catch (error) {
        console.error('Sign up error:', error);
        res.status(500).json({ message: "Something went wrong." });
    }
});

router.post('/google', async (req, res) => {
    const { credential } = req.body;

    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { sub: googleId, email, name, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                googleId,
                email,
                name,
                picture,
            });
        } else if (!user.googleId) {
            user.googleId = googleId;
            user.picture = picture;
            await user.save();
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ result: user, token });
    } catch (error) {
        console.error('Google sign in error:', error);
        res.status(500).json({ message: "Google authentication failed." });
    }
});

export default router;
