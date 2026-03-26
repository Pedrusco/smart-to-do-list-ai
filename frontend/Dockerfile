# Use official Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose application port
EXPOSE 3000

# Start the application
CMD [ "yarn", "dev", "-H", "0.0.0.0" ]