#!/bin/bash

echo "🚀 Starting Davvvat deployment..."

# Stop all containers
echo "📦 Stopping containers..."
docker-compose down

# Remove old images
echo "🧹 Cleaning old images..."
docker-compose down --rmi all

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up --build -d

# Wait for containers to start
echo "⏳ Waiting for containers to start..."
sleep 30

# Check container status
echo "📊 Checking container status..."
docker ps

# Show logs
echo "📋 Recent logs:"
echo "=== Backend logs ==="
docker logs davvvat_backend --tail 20

echo "=== Frontend logs ==="
docker logs davvvat_frontend --tail 20

echo "✅ Deployment completed!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5001"
echo "🗄️  Database: localhost:3306"
