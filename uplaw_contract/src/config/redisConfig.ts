import * as redis from 'redis';
import dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables from .env files
dotenv.config({path:join(__dirname, './../../.env')});

const redisConfig = async () => {
      // Create a Redis client using the REDIS_URL environment variable
     const client = redis.createClient({ url: process.env.REDIS_URL as string});
    
     // Log a message when the client connects to Redis
     client.on('connect', () => {
          console.log('Connected to Redis');
     });

     // Log an error message if the client encounters an error
     client.on('error', (err) => {
          console.error(`Redis error: ${err}`);
     });

     await client.connect();
};
      


export default redisConfig;
