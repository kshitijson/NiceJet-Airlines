import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import mongoose from 'mongoose';

import authRoute from './routes/authRoute'; 
import adminRoute from './routes/adminRoute'; 


dotenv.config({ path: __dirname + '/../.env' });

const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS configuration
const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Apply authentication middleware if needed
// app.use(authUser);

// Register and login routes
app.use('/api', authRoute);

app.use('/api', adminRoute);

const startServer = async (): Promise<void> => {
    app.listen(5000, () => {
        console.log('Server started on port 5000');
    });
};

// Connect to MongoDB and start server
mongoose.connect(process.env.DB_URL as string)
    .then(() => {
        console.log("Connection successful");
        return startServer();
    })
    .catch((error: Error) => {
        console.log(error.message);
    });
