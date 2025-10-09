# راهنمای رفع مشکل دیتابیس

## دستورات سریع برای رفع مشکل:

```bash
# 1. رفتن به پوشه پروژه
cd ~/davvvat-pro

# 2. Pull کردن تغییرات
git pull origin main

# 3. ساخت یا بررسی فایل .env
if [ ! -f .env ]; then cp env.example .env; fi

# 4. توقف و حذف containerها
docker-compose down -v

# 5. حذف volume قدیمی (اختیاری - در صورت مشکل)
docker volume rm davvvat-pro_mysql_data 2>/dev/null || true

# 6. راه‌اندازی مجدد
docker-compose up -d --build

# 7. منتظر بمانید 30 ثانیه
sleep 30

# 8. بررسی وضعیت
docker-compose ps
docker-compose logs backend | tail -20
```

## تست اتصال دیتابیس:

```bash
# ورود به MySQL و چک کردن دیتابیس
docker-compose exec mysql mysql -uroot -p11331133 -e "SHOW DATABASES;"

# بررسی تعداد eventها
docker-compose exec mysql mysql -uroot -p11331133 DavvvatDB -e "SELECT COUNT(*) FROM Event;"

# دیدن eventها
docker-compose exec mysql mysql -uroot -p11331133 DavvvatDB -e "SELECT id, eventName FROM Event LIMIT 5;"
```

## اگر دیتابیس خالی است:

```bash
# Import دستی دیتابیس
docker-compose exec -T mysql mysql -uroot -p11331133 DavvvatDB < database_dump.sql
```

## بررسی logها:

```bash
# Log MySQL
docker-compose logs mysql

# Log Backend
docker-compose logs backend

# همه logها
docker-compose logs -f
```
