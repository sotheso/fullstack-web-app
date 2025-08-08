#!/bin/bash

echo "🚀 Setting up Web Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Create .env file for backend
echo "🔧 Setting up backend environment..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file. Please edit it with your configuration."
else
    echo "✅ .env file already exists."
fi
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Edit backend/.env with your MongoDB URI and JWT secret"
echo "2. Run 'npm run dev' to start both frontend and backend"
echo "3. Frontend will be available at: http://localhost:3000"
echo "4. Backend API will be available at: http://localhost:5000"
echo ""
echo "Or start them separately:"
echo "- Frontend only: npm run dev:frontend"
echo "- Backend only: npm run dev:backend" 