# Use Nginx as the base image
FROM nginx:alpine

# Copy all your files into Nginx's default web directory
COPY . /usr/share/nginx/html

# Expose port 80 (default web port)
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
