# Dockerfile for backend service
FROM node:20.14.0-buster as build

# Set working directory
WORKDIR /app/backend

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
