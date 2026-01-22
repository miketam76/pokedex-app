# 📟 Pokedex Web Service
A responsive, containerized web application built with vanilla HTML, CSS, and JavaScript. This project demonstrates the use of CI/CD automation using GitHub Actions, Docker and Render web services.

# 🚀 Live Demo
https://pokedex-app-latest.onrender.com/

# 🛠️ Technology Stack
Frontend: Vanilla HTML5, CSS3, JavaScript (ES6+)

Containerization: Docker (Nginx-based)

Registry: Docker Hub

CI/CD: GitHub Actions

Hosting: Render (Web Service)

# 🏗️ DevOps Architecture
I chose a Docker-first deployment strategy to ensure the application remains portable and consistent across environments:

Automated Build: On every push to the main branch, a GitHub Action triggers.

Image Optimization: The workflow builds a production-ready Docker image, wrapping the HTML/JS assets into a lightweight web server.

Registry Push: The image is versioned and pushed to Docker Hub (miketam76/pokedex).

Instant Deployment: A deployment hook notifies Render, which pulls the fresh image and updates the live site.

# 📦 Local Usage
To run the Pokedex locally without needing to manage files, use Docker:

Bash

docker pull miketam76/pokedex:latest
docker run -d -p 80:80 miketam76/pokedex
# 🌟 Key Features
Vanilla JavaScript Logic: Core functionality built with standard ES6+ JavaScript, demonstrating a deep understanding of DOM manipulation and asynchronous API fetching without the "crutch" of a framework.

Modern CSS Layouts: Uses Flexbox and Grid to ensure a fully responsive experience that scales from mobile devices to desktop monitors.

Containerized Consistency: Wrapped in a lightweight Docker image (Nginx), ensuring the application runs identically in development, testing, and production.

Production-Grade CI/CD: A fully automated pipeline that handles building, versioning, and cloud deployment, reducing manual overhead and human error.