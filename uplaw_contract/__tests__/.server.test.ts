import * as redis from 'redis';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { join } from 'path';
import app from './../src/app';
const serverMainApp = http.createServer(app)


// Load environment variables from .env files
dotenv.config({path:join(__dirname,'./test.env')});
export const MONGO_URL = process.env.MONGO_URL as string;
export const REDIS_URL = process.env.REDIS_URL as string;
export const PORT = process.env.PORT as string;



// setup mongodb
beforeEach(async () => await mongoose.connect(MONGO_URL));
afterEach(async () => await mongoose.connection.close());




describe('test database', () => {

  try {

    it('should connect to the MongoDB database', async () => {
      expect(mongoose.connection.readyState).toBe(1)
    });

    it('should connect to the Redis server', async () => {
      const client = redis.createClient({ url: REDIS_URL });
      client.on('connect', () => {
        expect(client.connect).toBe(true)
        client.quit()
      });
    });

  } catch (error) {
    console.log(error)
  };
});