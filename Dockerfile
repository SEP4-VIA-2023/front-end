# Use the official Node.js 16.10-alpine image as the base
FROM node:16.10-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.lock.json since npm install was already ran in the circleci config
RUN npm ci

# Build the app
RUN npm run build

# Serve the app
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Set the environment variable for the server to listen on all network interfaces
ENV HOST=0.0.0.0

# Run the command to start the app
CMD ["serve", "-s", "build"]
