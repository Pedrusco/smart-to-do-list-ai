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

# Build the NestJS application
RUN yarn build

# Expose application port
EXPOSE 3000

# Start the application in production mode
CMD [ "yarn", "start:prod" ]