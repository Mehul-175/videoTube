import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Enable CORS with proper credentials
app.use(
    cors({
        origin: process.env.CORS_ORIGIN, // Ensure this is set correctly
        credentials: true,
    })
);


// Serve static files (avatars, cover images, etc.)
app.use(express.static('public'));
// Middleware for parsing JSON bodies
app.use(express.json()); // Handles application/json
app.use(express.urlencoded({ extended: true })); // Handles application/x-www-form-urlencoded
app.use(cookieParser());

// Use cookieParser to handle cookies

// Import routes
import healthcheckRouter from './routes/healthcheck.routes.js';
import userRouter from './routes/user.routes.js';

// Define routes
app.use('/api/v1/healthcheck', healthcheckRouter);
app.use('/api/v1/users', userRouter);

export { app };
