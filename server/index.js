import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello to reminisce API')
})

// MongoDB connection string
//const CONNECTION_URL = 'mongodb+srv://prajapatijenil0407:AvoVirW6OiSFimaV@cluster0.nq1ad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 5001; // Make sure to use `PORT` in uppercase

//might have to remove the useNewUrlParser and useUnifiedTopology later
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// Remove this line as `useFindAndModify` is no longer supported
// mongoose.set('useFindAndModify', false);
