# Use an official Node.js runtime as a parent image.
# Using node:20-alpine to support 'node:dns/promises' used in connection.js and keep image size small.
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
# This is done before copying the code to leverage Docker cache for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (Defaulting to 8000 to match previous configuration attempts)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
