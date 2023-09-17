import { createClient }from 'redis';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { join } from 'path';
import { Server } from 'socket.io';



// Load environment variables from .env files
dotenv.config({ path: join(__dirname, './test.env') });

// Set environment variables
const MONGO_URL = process.env.MONGO_URL as string;
const REDIS_URL = process.env.REDIS_URL as string;
const PORT = process.env.PORT as string;

// Declare variables for server and Socket.IO
let server: http.Server;
let io : Server;

// Start the server before running tests
beforeAll((done) => {
   server = http.createServer();
  io = new Server(server)
  server.listen(PORT, () => {
   console.log(`running server on port ${PORT}`)
    done()
  });
});


// Run tests for server application
describe('test servers application', () => {

 // Test MongoDB connection
    it('should connect to the MongoDB database', async () => {
      await mongoose.connect(MONGO_URL);
      expect(mongoose.connection.readyState).toBe(1)
      await mongoose.connection.close();
    });
  
  // Test Redis connection
    it('should connect to the Redis server', () => {
      const client = createClient({ url: REDIS_URL });
      client.on('connect', () => {
        expect(client.connect).toBe(true)
        client.quit()
      });
    });
 // Test Socket.IO implementation
    it('test socket on server ', (done) => {
      server.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    server.emit("hello", "world");
    })
});

// Close the server after running tests
afterAll((done) => {
  io.close(() => {
    server.close(() => {
      done()
    });
  });
});


