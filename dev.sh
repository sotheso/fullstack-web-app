#!/bin/bash

# Davvvat Project Development Script
# This script runs the application in development mode with Docker

set -e

echo "🔧 Starting Davvvat Project in Development Mode..."

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

# Stop existing development containers
echo "🛑 Stopping existing development containers..."
docker-compose -f docker-compose.dev.yml down --remove-orphans

# Start development services
echo "🚀 Starting development services..."
docker-compose -f docker-compose.dev.yml up --build -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 15

# Check service status
echo "📊 Checking development service status..."
docker-compose -f docker-compose.dev.yml ps

echo ""
echo "✅ Development environment is ready!"
echo ""
echo "🌐 Your development services are running at:"
echo "   Frontend: http://localhost:3001"
echo "   Backend API: http://localhost:5002"
echo "   Database: localhost:3307"
echo ""
echo "📋 Useful development commands:"
echo "   View logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "   Stop services: docker-compose -f docker-compose.dev.yml down"
echo "   Restart services: docker-compose -f docker-compose.dev.yml restart"
echo "   Rebuild: docker-compose -f docker-compose.dev.yml up --build -d"
echo ""
echo "🔄 Hot reload is enabled for both frontend and backend!"
echo "   Changes will automatically reload the services."
