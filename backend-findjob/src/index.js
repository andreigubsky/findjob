import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import mongoose from 'mongoose'; // Example with Mongoose for MongoDB

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// const connectionString = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const connectionString = `mongodb://${dbHost}:${dbPort}`;

mongoose.connect(connectionString);
const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected:', dbHost);
});

db.on('error', err => {
  console.error('connection error:', err);
});

// Using Express.js in a TypeScript project
import express, { Request, Response } from 'express';

const app = express();

app.get('/set-cookie', (req: Request, res: Response) => {
  const sessionId = 'your_session_id_here'; // Replace with a real session ID
  const token = 'your_jwt_token_here';

  // Set a session cookie with httpOnly and secure flags
  res.cookie('sessionId', sessionId, {
    httpOnly: true,  // Cannot be accessed by JavaScript
    secure: true,    // Only sent over HTTPS
    sameSite: 'lax', // Mitigates CSRF attacks
  });

  // Set a JWT token cookie
  res.cookie('jwtToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 1000 * 60 * 60) // Example: expires in 1 hour
  });

  res.send('Cookies have been set!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
