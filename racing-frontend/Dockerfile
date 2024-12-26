# Use the latest stable Node.js image
FROM node:18 AS builder

# Set the working directory
WORKDIR /racing

# Copy and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy application source and build the project
COPY . .
RUN npm run build

FROM httpd:2.4
COPY --from=builder /racing/dist/ /usr/local/apache2/htdocs/

EXPOSE 80
CMD ["httpd-foreground"]