#!/bin/bash

# Davvvat Project Stop Script
# This script stops all running services

echo "🛑 Stopping Davvvat Project..."
echo "==============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to kill process on port
kill_port() {
    local port=$1
    local service_name=$2
    local pid=$(lsof -ti :$port)
    if [ ! -z "$pid" ]; then
        echo -e "${YELLOW}Stopping $service_name on port $port (PID: $pid)${NC}"
        kill -9 $pid
        sleep 2
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo -e "${RED}❌ Failed to stop $service_name${NC}"
        else
            echo -e "${GREEN}✅ $service_name stopped successfully${NC}"
        fi
    else
        echo -e "${BLUE}ℹ️  No process found on port $port${NC}"
    fi
}

# Stop Frontend (port 3000)
echo -e "${BLUE}Stopping Frontend...${NC}"
kill_port 3000 "Frontend"

# Stop Backend (port 5001)
echo -e "${BLUE}Stopping Backend...${NC}"
kill_port 5001 "Backend"

# Check for any remaining Node.js processes related to the project
echo -e "${BLUE}Checking for remaining project processes...${NC}"
REMAINING_PIDS=$(ps aux | grep -E "(next dev|nodemon.*src/index.js)" | grep -v grep | awk '{print $2}')

if [ ! -z "$REMAINING_PIDS" ]; then
    echo -e "${YELLOW}Found remaining processes: $REMAINING_PIDS${NC}"
    echo -e "${YELLOW}Killing remaining processes...${NC}"
    echo $REMAINING_PIDS | xargs kill -9
    sleep 2
    echo -e "${GREEN}✅ All remaining processes stopped${NC}"
else
    echo -e "${GREEN}✅ No remaining processes found${NC}"
fi

# Final status
echo ""
echo -e "${GREEN}🎉 All services stopped successfully!${NC}"
echo ""
echo -e "${BLUE}📋 To start the project again, run:${NC}"
echo -e "   ${YELLOW}./run.sh${NC}"
echo ""
