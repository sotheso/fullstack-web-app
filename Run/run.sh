#!/bin/bash

# Davvvat Project Startup Script
# This script starts the frontend, backend, and database services

echo "🚀 Starting Davvvat Project..."
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    local pid=$(lsof -ti :$port)
    if [ ! -z "$pid" ]; then
        echo -e "${YELLOW}Killing process on port $port (PID: $pid)${NC}"
        kill -9 $pid
        sleep 2
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo -e "${BLUE}Waiting for $service_name to be ready...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $service_name is ready!${NC}"
            return 0
        fi
        echo -n "."
        sleep 1
        ((attempt++))
    done
    
    echo -e "${RED}❌ $service_name failed to start after $max_attempts seconds${NC}"
    return 1
}

# Step 1: Check MySQL
echo -e "${BLUE}1. Checking MySQL service...${NC}"
if brew services list | grep mysql | grep started > /dev/null; then
    echo -e "${GREEN}✅ MySQL is running${NC}"
else
    echo -e "${YELLOW}⚠️  MySQL is not running. Starting MySQL...${NC}"
    brew services start mysql
    sleep 5
    if brew services list | grep mysql | grep started > /dev/null; then
        echo -e "${GREEN}✅ MySQL started successfully${NC}"
    else
        echo -e "${RED}❌ Failed to start MySQL${NC}"
        exit 1
    fi
fi

# Step 2: Kill existing processes on ports 3000 and 5001
echo -e "${BLUE}2. Cleaning up existing processes...${NC}"
kill_port 3000
kill_port 5001

# Step 3: Start Backend
echo -e "${BLUE}3. Starting Backend (Node.js/Express on port 5001)...${NC}"
cd /Users/sothesom/Documents/JAHAD/Davvvat/pro/backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to be ready
if wait_for_service "http://localhost:5001" "Backend"; then
    echo -e "${GREEN}✅ Backend started successfully (PID: $BACKEND_PID)${NC}"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    echo "Check backend.log for details:"
    tail -20 ../backend.log
    exit 1
fi

# Step 4: Start Frontend
echo -e "${BLUE}4. Starting Frontend (Next.js on port 3000)...${NC}"
cd /Users/sothesom/Documents/JAHAD/Davvvat/pro/frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!

# Wait for frontend to be ready
if wait_for_service "http://localhost:3000" "Frontend"; then
    echo -e "${GREEN}✅ Frontend started successfully (PID: $FRONTEND_PID)${NC}"
else
    echo -e "${RED}❌ Frontend failed to start${NC}"
    echo "Check frontend.log for details:"
    tail -20 ../frontend.log
    exit 1
fi

# Step 5: Verify all services
echo -e "${BLUE}5. Verifying all services...${NC}"

# Check ports
if check_port 3000 && check_port 5001; then
    echo -e "${GREEN}✅ All ports are active${NC}"
else
    echo -e "${RED}❌ Some ports are not active${NC}"
    exit 1
fi

# Test API endpoints
echo -e "${BLUE}Testing API endpoints...${NC}"
if curl -s http://localhost:5001/api/events > /dev/null; then
    echo -e "${GREEN}✅ Events API is working${NC}"
else
    echo -e "${YELLOW}⚠️  Events API not responding${NC}"
fi

if curl -s http://localhost:5001/api/brands > /dev/null; then
    echo -e "${GREEN}✅ Brands API is working${NC}"
else
    echo -e "${YELLOW}⚠️  Brands API not responding${NC}"
fi

# Final status
echo ""
echo "🎉 ================================"
echo -e "${GREEN}🎉 Davvvat Project is running!${NC}"
echo "🎉 ================================"
echo ""
echo -e "${BLUE}📱 Frontend (Next.js):${NC}"
echo -e "   ${GREEN}http://localhost:3000${NC}"
echo ""
echo -e "${BLUE}⚙️  Backend (Node.js/Express):${NC}"
echo -e "   ${GREEN}http://localhost:5001${NC}"
echo ""
echo -e "${BLUE}🔗 API Endpoints:${NC}"
echo -e "   ${GREEN}http://localhost:5001/api${NC}"
echo -e "   ${GREEN}http://localhost:5001/api/events${NC}"
echo -e "   ${GREEN}http://localhost:5001/api/brands${NC}"
echo -e "   ${GREEN}http://localhost:5001/api/banners${NC}"
echo ""
echo -e "${BLUE}🗄️  Database:${NC}"
echo -e "   ${GREEN}MySQL (DavvvatDB) - Running${NC}"
echo ""
echo -e "${YELLOW}📝 Process IDs:${NC}"
echo -e "   Backend PID: $BACKEND_PID"
echo -e "   Frontend PID: $FRONTEND_PID"
echo ""
echo -e "${YELLOW}📋 Logs:${NC}"
echo -e "   Backend: backend.log"
echo -e "   Frontend: frontend.log"
echo ""
echo -e "${BLUE}🛑 To stop all services, run:${NC}"
echo -e "   ${YELLOW}kill $BACKEND_PID $FRONTEND_PID${NC}"
echo ""
echo -e "${GREEN}✨ Enjoy your development! ✨${NC}"
