#!/bin/bash

# Script for checking Docker containers status and MySQL connectivity
# Created for debugging Davvvat project on VPS

echo "=================================="
echo "🔍 Davvvat Status Check Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print section headers
print_header() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# 1. Check Docker installation
print_header "1️⃣  بررسی نصب Docker"
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓ Docker نصب شده است${NC}"
    docker --version
else
    echo -e "${RED}✗ Docker نصب نشده است!${NC}"
    exit 1
fi

if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓ Docker Compose نصب شده است${NC}"
    docker-compose --version
else
    echo -e "${RED}✗ Docker Compose نصب نشده است!${NC}"
    exit 1
fi

# 2. Check all containers status
print_header "2️⃣  وضعیت تمام کانتینرها"
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 3. Check specific Davvvat containers
print_header "3️⃣  وضعیت کانتینرهای Davvvat"
for container in davvvat_mysql davvvat_backend davvvat_frontend davvvat_nginx; do
    if docker ps -a --format '{{.Names}}' | grep -q "^${container}$"; then
        status=$(docker inspect --format='{{.State.Status}}' $container 2>/dev/null)
        if [ "$status" = "running" ]; then
            echo -e "${GREEN}✓ $container: در حال اجرا${NC}"
        else
            echo -e "${RED}✗ $container: $status${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ $container: یافت نشد${NC}"
    fi
done

# 4. Check container health
print_header "4️⃣  وضعیت سلامت کانتینرها (Health Check)"
for container in davvvat_mysql davvvat_backend davvvat_frontend; do
    if docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
        health=$(docker inspect --format='{{.State.Health.Status}}' $container 2>/dev/null || echo "no healthcheck")
        if [ "$health" = "healthy" ]; then
            echo -e "${GREEN}✓ $container: سالم${NC}"
        elif [ "$health" = "unhealthy" ]; then
            echo -e "${RED}✗ $container: ناسالم${NC}"
        elif [ "$health" = "starting" ]; then
            echo -e "${YELLOW}⏳ $container: در حال راه‌اندازی${NC}"
        else
            echo -e "${YELLOW}⚠ $container: بدون healthcheck${NC}"
        fi
    fi
done

# 5. MySQL Container Logs
print_header "5️⃣  لاگ‌های MySQL (50 خط آخر)"
if docker ps --format '{{.Names}}' | grep -q "^davvvat_mysql$"; then
    docker logs davvvat_mysql --tail 50
else
    echo -e "${RED}کانتینر MySQL در حال اجرا نیست!${NC}"
    echo "لاگ‌های آخرین اجرا:"
    docker logs davvvat_mysql --tail 50 2>&1 || echo "لاگی یافت نشد"
fi

# 6. Backend Container Logs
print_header "6️⃣  لاگ‌های Backend (50 خط آخر)"
if docker ps --format '{{.Names}}' | grep -q "^davvvat_backend$"; then
    docker logs davvvat_backend --tail 50
else
    echo -e "${RED}کانتینر Backend در حال اجرا نیست!${NC}"
    echo "لاگ‌های آخرین اجرا:"
    docker logs davvvat_backend --tail 50 2>&1 || echo "لاگی یافت نشد"
fi

# 7. Frontend Container Logs
print_header "7️⃣  لاگ‌های Frontend (30 خط آخر)"
if docker ps --format '{{.Names}}' | grep -q "^davvvat_frontend$"; then
    docker logs davvvat_frontend --tail 30
else
    echo -e "${RED}کانتینر Frontend در حال اجرا نیست!${NC}"
    echo "لاگ‌های آخرین اجرا:"
    docker logs davvvat_frontend --tail 30 2>&1 || echo "لاگی یافت نشد"
fi

# 8. Check Docker Networks
print_header "8️⃣  شبکه‌های Docker"
docker network ls | grep davvvat
echo ""
echo "جزئیات شبکه davvvat_network:"
docker network inspect davvvat_network 2>/dev/null | grep -A 5 "Containers" || echo -e "${YELLOW}شبکه davvvat_network یافت نشد${NC}"

# 9. Test MySQL connectivity from Backend
print_header "9️⃣  تست اتصال MySQL از Backend"
if docker ps --format '{{.Names}}' | grep -q "^davvvat_backend$" && docker ps --format '{{.Names}}' | grep -q "^davvvat_mysql$"; then
    echo "تست با nc (netcat):"
    docker exec davvvat_backend sh -c "command -v nc >/dev/null 2>&1 && nc -zv mysql 3306 2>&1" || echo -e "${YELLOW}netcat در کانتینر Backend نصب نیست${NC}"
    
    echo ""
    echo "تست با telnet:"
    docker exec davvvat_backend sh -c "command -v telnet >/dev/null 2>&1 && timeout 5 telnet mysql 3306 2>&1" || echo -e "${YELLOW}telnet در کانتینر Backend نصب نیست${NC}"
    
    echo ""
    echo "تست با curl/wget:"
    docker exec davvvat_backend sh -c "curl -v telnet://mysql:3306 2>&1 | head -n 5" || echo -e "${YELLOW}نمیتواند با curl تست شود${NC}"
else
    echo -e "${RED}یکی از کانتینرها در حال اجرا نیست${NC}"
fi

# 10. Check Backend Environment Variables
print_header "🔟 متغیرهای محیطی Backend"
if docker ps --format '{{.Names}}' | grep -q "^davvvat_backend$"; then
    echo "متغیرهای مرتبط با دیتابیس:"
    docker exec davvvat_backend env | grep -E "DB_|NODE_ENV|PORT" | sort
else
    echo -e "${RED}کانتینر Backend در حال اجرا نیست${NC}"
fi

# 11. Check Docker Volumes
print_header "1️⃣1️⃣ حجم‌های Docker (Volumes)"
docker volume ls | grep davvvat
echo ""
echo "جزئیات mysql_data volume:"
docker volume inspect pro_mysql_data 2>/dev/null || echo -e "${YELLOW}Volume یافت نشد${NC}"

# 12. Check Disk Space
print_header "1️⃣2️⃣ فضای دیسک"
df -h | grep -E "Filesystem|/$|/var"
echo ""
echo "فضای استفاده شده توسط Docker:"
docker system df

# 13. Try to connect to MySQL directly
print_header "1️⃣3️⃣ تلاش برای اتصال مستقیم به MySQL"
if docker ps --format '{{.Names}}' | grep -q "^davvvat_mysql$"; then
    echo "تلاش برای اتصال با user: davvvat_user"
    echo "اگر رمز عبور خواسته شد، رمز پیش‌فرض: davvvat_pass"
    echo ""
    docker exec -it davvvat_mysql mysql -u davvvat_user -pdavvvat_pass -e "SELECT 1;" 2>&1 | head -n 10
    
    echo ""
    echo "لیست دیتابیس‌ها:"
    docker exec -it davvvat_mysql mysql -u davvvat_user -pdavvvat_pass -e "SHOW DATABASES;" 2>&1
    
    echo ""
    echo "لیست جداول در DavvvatDB:"
    docker exec -it davvvat_mysql mysql -u davvvat_user -pdavvvat_pass DavvvatDB -e "SHOW TABLES;" 2>&1
else
    echo -e "${RED}کانتینر MySQL در حال اجرا نیست${NC}"
fi

# 14. Check if .env file exists
print_header "1️⃣4️⃣ بررسی فایل .env"
if [ -f .env ]; then
    echo -e "${GREEN}✓ فایل .env موجود است${NC}"
    echo "محتوای غیرحساس فایل .env:"
    grep -v "PASSWORD\|SECRET\|KEY" .env 2>/dev/null || echo "فایل خالی است یا فقط اطلاعات حساس دارد"
else
    echo -e "${YELLOW}⚠ فایل .env یافت نشد - از مقادیر پیش‌فرض docker-compose استفاده می‌شود${NC}"
fi

# 15. Summary and Recommendations
print_header "1️⃣5️⃣ خلاصه و پیشنهادات"

echo "دستورات مفید برای debugging بیشتر:"
echo ""
echo -e "${BLUE}# مشاهده لاگ‌های زنده MySQL:${NC}"
echo "docker logs -f davvvat_mysql"
echo ""
echo -e "${BLUE}# مشاهده لاگ‌های زنده Backend:${NC}"
echo "docker logs -f davvvat_backend"
echo ""
echo -e "${BLUE}# ری‌استارت کردن همه سرویس‌ها:${NC}"
echo "docker-compose restart"
echo ""
echo -e "${BLUE}# ری‌استارت کردن فقط MySQL:${NC}"
echo "docker-compose restart mysql"
echo ""
echo -e "${BLUE}# پاک کردن و شروع مجدد (خطرناک - دیتا پاک می‌شود):${NC}"
echo "docker-compose down -v && docker-compose up -d --build"
echo ""
echo -e "${BLUE}# ورود به shell کانتینر MySQL:${NC}"
echo "docker exec -it davvvat_mysql bash"
echo ""
echo -e "${BLUE}# ورود به shell کانتینر Backend:${NC}"
echo "docker exec -it davvvat_backend sh"
echo ""

echo "=================================="
echo "✅ بررسی به پایان رسید"
echo "=================================="

