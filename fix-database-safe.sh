#!/bin/bash

# اسکریپت امن برای رفع مشکل دیتابیس - بدون حذف داده‌ها

# رنگ‌ها برای خروجی
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  رفع مشکل دیتابیس (بدون حذف داده‌ها)     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}\n"

# 1. بررسی وجود فایل .env
echo -e "${YELLOW}📋 مرحله 1: بررسی فایل .env...${NC}"
if [ ! -f .env ]; then
    echo -e "${RED}✗ فایل .env وجود ندارد!${NC}"
    echo -e "${GREEN}➜ کپی کردن از env.example...${NC}"
    cp env.example .env
    echo -e "${GREEN}✓ فایل .env ساخته شد${NC}\n"
else
    echo -e "${GREEN}✓ فایل .env موجود است${NC}\n"
fi

# 2. بررسی containerهای در حال اجرا
echo -e "${YELLOW}📊 مرحله 2: بررسی وضعیت containerها...${NC}"
docker-compose ps
echo

# 3. Restart کردن سرویس‌ها (بدون حذف volume)
echo -e "${YELLOW}🔄 مرحله 3: Restart کردن سرویس‌ها...${NC}"
echo -e "${GREEN}➜ توقف سرویس‌ها (داده‌ها حفظ می‌شوند)...${NC}"
docker-compose stop
sleep 2

echo -e "${GREEN}➜ راه‌اندازی مجدد MySQL...${NC}"
docker-compose up -d mysql
echo -e "${GREEN}✓ MySQL شروع شد${NC}\n"

# 4. انتظار برای آماده شدن MySQL
echo -e "${YELLOW}⏳ مرحله 4: انتظار برای آماده شدن MySQL...${NC}"
for i in {30..1}; do
    echo -ne "${BLUE}⏱  $i ثانیه باقی‌مانده...\r${NC}"
    sleep 1
done
echo -e "\n${GREEN}✓ MySQL باید آماده باشد${NC}\n"

# 5. بررسی اتصال به MySQL
echo -e "${YELLOW}🔍 مرحله 5: تست اتصال به MySQL...${NC}"
if docker-compose exec -T mysql mysql -uroot -p${MYSQL_ROOT_PASSWORD:-11331133} -e "SHOW DATABASES;" 2>/dev/null | grep -q "DavvvatDB"; then
    echo -e "${GREEN}✓ اتصال به MySQL موفقیت‌آمیز!${NC}"
    echo -e "${GREEN}✓ دیتابیس DavvvatDB موجود است${NC}\n"
else
    echo -e "${RED}✗ خطا در اتصال به MySQL یا دیتابیس وجود ندارد${NC}"
    echo -e "${YELLOW}➜ بررسی logهای MySQL:${NC}"
    docker-compose logs --tail=30 mysql
    echo
fi

# 6. بررسی وجود داده‌ها
echo -e "${YELLOW}📊 مرحله 6: بررسی داده‌های دیتابیس...${NC}"
EVENT_COUNT=$(docker-compose exec -T mysql mysql -uroot -p${MYSQL_ROOT_PASSWORD:-11331133} DavvvatDB -e "SELECT COUNT(*) FROM Event;" 2>/dev/null | tail -1)
if [ ! -z "$EVENT_COUNT" ]; then
    echo -e "${GREEN}✓ تعداد Eventها: $EVENT_COUNT${NC}\n"
else
    echo -e "${YELLOW}⚠️  نتوانستیم تعداد Eventها را بخوانیم${NC}"
    echo -e "${YELLOW}➜ آیا می‌خواهید دیتابیس را از dump مجدداً import کنید؟ (y/N)${NC}"
    read -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if [ -f database_dump.sql ]; then
            echo -e "${GREEN}➜ Import کردن دیتابیس...${NC}"
            docker-compose exec -T mysql mysql -uroot -p${MYSQL_ROOT_PASSWORD:-11331133} DavvvatDB < database_dump.sql
            echo -e "${GREEN}✓ دیتابیس import شد${NC}\n"
        else
            echo -e "${RED}✗ فایل database_dump.sql وجود ندارد!${NC}\n"
        fi
    fi
fi

# 7. راه‌اندازی Backend
echo -e "${YELLOW}🚀 مرحله 7: راه‌اندازی Backend...${NC}"
docker-compose up -d backend
sleep 5
echo -e "${GREEN}✓ Backend راه‌اندازی شد${NC}\n"

# 8. بررسی اتصال Backend به MySQL
echo -e "${YELLOW}🔍 مرحله 8: بررسی اتصال Backend به دیتابیس...${NC}"
docker-compose logs backend | grep -i "database\|mysql\|connection" | tail -10
echo

# 9. راه‌اندازی Frontend و Nginx
echo -e "${YELLOW}🚀 مرحله 9: راه‌اندازی Frontend و Nginx...${NC}"
docker-compose up -d frontend nginx
echo -e "${GREEN}✓ همه سرویس‌ها راه‌اندازی شدند${NC}\n"

# 10. نمایش وضعیت نهایی
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           وضعیت نهایی سرویس‌ها            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}\n"
docker-compose ps
echo

# 11. تست API
echo -e "${YELLOW}🧪 تست API:${NC}"
echo -e "${GREEN}➜ تست endpoint events:${NC}"
curl -s http://localhost:5002/api/events | head -c 200
echo -e "\n"

# نتیجه نهایی
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                 پایان                     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}\n"

echo -e "${GREEN}✓ عملیات به پایان رسید${NC}"
echo -e "${YELLOW}📝 دستورات مفید:${NC}"
echo -e "  ${BLUE}•${NC} دیدن logهای زنده: ${GREEN}docker-compose logs -f${NC}"
echo -e "  ${BLUE}•${NC} دیدن log backend: ${GREEN}docker-compose logs backend${NC}"
echo -e "  ${BLUE}•${NC} restart کردن: ${GREEN}docker-compose restart${NC}"
echo -e "  ${BLUE}•${NC} وضعیت سرویس‌ها: ${GREEN}docker-compose ps${NC}\n"

