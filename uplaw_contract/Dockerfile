# Use an official Node.js runtime as a parent image
FROM node:18.1.0

# Set the working directory to run server in typescript
WORKDIR /uplaw_contract/src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code to JavaScript
RUN --outDir build

# Run JavaScript 
RUN npm  start

# Expose port 3000 for the server
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "start","dev","test"]
