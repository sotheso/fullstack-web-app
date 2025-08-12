#!/bin/bash

# Davvvat Project Deployment Script
# This script deploys the full-stack application on VPS with Docker

set -e

echo "🚀 Starting Davvvat Project Deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install it first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your production values before continuing."
    echo "   Press Enter when ready to continue..."
    read
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down --remove-orphans

# Remove old images
echo "🧹 Cleaning up old images..."
docker system prune -f

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check service status
echo "📊 Checking service status..."
docker-compose ps

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Deployment completed successfully!"
    echo ""
    echo "🌐 Your application is now running at:"
    echo "   Frontend: http://$(hostname -I | awk '{print $1}'):3000"
    echo "   Backend API: http://$(hostname -I | awk '{print $1}'):5001"
    echo "   Nginx Proxy: http://$(hostname -I | awk '{print $1}'):80"
    echo ""
    echo "📋 Useful commands:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop services: docker-compose down"
    echo "   Restart services: docker-compose restart"
    echo "   Update services: docker-compose pull && docker-compose up -d"
else
    echo "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi
