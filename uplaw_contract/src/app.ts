import express from 'express';
import type { Application } from 'express';
import { join } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import passport from "passport";


// main router app
import mainRouter from './router/mainContractRouter';


// setup Express middleware
export const app: Application = express();


// Helmet middleware for security headers
app.use(helmet());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Serve static files from the 'image' directory
app.use('/image', express.static(join(__dirname, 'image')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', join(__dirname, 'views'));

// main router
app.use('/api/v1', mainRouter);

// Initialize Passport for authentication
app.use(passport.initialize());

export default app; 







