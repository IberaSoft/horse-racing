# Use a Node.js image to run the backend directly if no build step is involved.
FROM node:18

# Set the working directory
WORKDIR /racing

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Expose necessary ports
EXPOSE 8000

# Start the backend application
CMD ["npm", "start"]
