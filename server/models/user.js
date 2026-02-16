import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    picture: { type: String },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', userSchema);

export default User;
