#!/bin/bash

# Change directory to /var/www/my-app
cd /var/www/my-app

# Copy .env file to dist directory
cp .env dist/

npm install pm2 -g

# Change directory to dist
cd dist

# Start the application with pm2
pm2 start index.js --name app --watch