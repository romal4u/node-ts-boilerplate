#!/bin/bash

# Change directory to /var/www/my-app
cd /var/www/my-app || exit

# Copy .env file to dist directory
cp .env dist/ || exit

# Change directory to dist
cd dist || exit

npm install pm2 -g

# Start the application with pm2
pm2 start index.js --name app --watch