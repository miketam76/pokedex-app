# 📟 Pokedex Web Service
A responsive, containerized web application built with vanilla HTML, CSS, and JavaScript. This project serves as a standalone module within my Forest-Themed Blog ecosystem, demonstrating how legacy-style web apps can be modernized using Docker and CI/CD automation.

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
Modular Design: Built to be easily consumed by my Angular-based forest blog.

Responsive UI: Fully functional across mobile and desktop views.

Optimized Delivery: Served via a containerized environment for high availability.

Automated Workflow: Zero manual intervention required from code commit to live update.