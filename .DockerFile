# Use the official Node.js image from the Docker Hub
FROM node:alpine3.10

# Create a directory for the app inside the container
RUN mkdir /app

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json /app/

# Install dependencies
RUN npm install

# Install the Nest CLI globally
RUN npm install -g @nestjs/cli

# Copy the rest of the application code to the working directory
COPY . /app

# Expose the port the app runs on
EXPOSE 3000

# Start the application using the Nest CLI
CMD ["nest", "start"]
