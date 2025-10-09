#!/bin/bash

# رنگ‌ها برای خروجی
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== بررسی و رفع مشکل دیتابیس ===${NC}\n"

# 1. بررسی وجود فایل .env
echo -e "${YELLOW}1. بررسی فایل .env...${NC}"
if [ ! -f .env ]; then
    echo -e "${RED}فایل .env وجود ندارد!${NC}"
    echo -e "${GREEN}کپی کردن از env.example...${NC}"
    cp env.example .env
    echo -e "${GREEN}✓ فایل .env ساخته شد. لطفاً آن را ویرایش کنید.${NC}\n"
else
    echo -e "${GREEN}✓ فایل .env موجود است${NC}\n"
fi

# 2. توقف و حذف containerهای قبلی
echo -e "${YELLOW}2. توقف containerهای قبلی...${NC}"
docker-compose down -v
echo -e "${GREEN}✓ Containerها متوقف شدند${NC}\n"

# 3. حذف volumeهای قدیمی MySQL (اختیاری - فقط در صورت مشکل)
echo -e "${RED}⚠️  هشدار: حذف volume باعث پاک شدن کامل دیتابیس می‌شود!${NC}"
echo -e "${YELLOW}فقط در صورتی که دیتابیس خراب شده و راهی دیگری نمانده این کار را انجام دهید.${NC}"
echo -e "${YELLOW}داده‌ها از طریق database_dump.sql دوباره import می‌شوند.${NC}"
read -p "آیا می‌خواهید volumeهای قدیمی MySQL را حذف کنید؟ (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}حذف volumeهای MySQL...${NC}"
    docker volume rm davvvat-pro_mysql_data 2>/dev/null || true
    echo -e "${GREEN}✓ Volumeها حذف شدند - دیتابیس از dump مجدداً ساخته می‌شود${NC}\n"
else
    echo -e "${GREEN}✓ Volume حفظ شد - داده‌های موجود باقی می‌مانند${NC}\n"
fi

# 4. بررسی وجود database_dump.sql
echo -e "${YELLOW}3. بررسی فایل database_dump.sql...${NC}"
if [ ! -f database_dump.sql ]; then
    echo -e "${RED}✗ فایل database_dump.sql وجود ندارد!${NC}"
    echo -e "${YELLOW}لطفاً این فایل را از مخزن دریافت کنید.${NC}\n"
else
    echo -e "${GREEN}✓ فایل database_dump.sql موجود است${NC}\n"
fi

# 5. راه‌اندازی فقط MySQL
echo -e "${YELLOW}4. راه‌اندازی MySQL...${NC}"
docker-compose up -d mysql
echo -e "${GREEN}✓ MySQL container شروع شد${NC}\n"

# 6. انتظار برای آماده شدن MySQL
echo -e "${YELLOW}5. انتظار برای آماده شدن MySQL (30 ثانیه)...${NC}"
for i in {30..1}; do
    echo -ne "${YELLOW}$i ثانیه باقی‌مانده...\r${NC}"
    sleep 1
done
echo -e "${GREEN}✓ MySQL باید آماده باشد${NC}\n"

# 7. بررسی وضعیت MySQL
echo -e "${YELLOW}6. بررسی وضعیت MySQL...${NC}"
docker-compose ps mysql
echo

# 8. بررسی logهای MySQL
echo -e "${YELLOW}7. آخرین logهای MySQL:${NC}"
docker-compose logs --tail=20 mysql
echo

# 9. تست اتصال به MySQL
echo -e "${YELLOW}8. تست اتصال به MySQL...${NC}"
docker-compose exec mysql mysql -uroot -p11331133 -e "SHOW DATABASES;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ اتصال به MySQL موفقیت‌آمیز!${NC}\n"
else
    echo -e "${RED}✗ خطا در اتصال به MySQL${NC}\n"
    echo -e "${YELLOW}لطفاً رمز عبور root را بررسی کنید یا logها را مطالعه کنید.${NC}\n"
fi

# 10. راه‌اندازی بقیه سرویس‌ها
echo -e "${YELLOW}9. راه‌اندازی بقیه سرویس‌ها...${NC}"
docker-compose up -d
echo -e "${GREEN}✓ همه سرویس‌ها راه‌اندازی شدند${NC}\n"

# 11. نمایش وضعیت نهایی
echo -e "${YELLOW}10. وضعیت نهایی:${NC}"
docker-compose ps
echo

echo -e "${GREEN}=== پایان ===${NC}"
echo -e "${YELLOW}برای دیدن logهای زنده: docker-compose logs -f${NC}"
echo -e "${YELLOW}برای بررسی backend: docker-compose logs backend${NC}"

