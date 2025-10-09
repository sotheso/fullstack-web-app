# راهنمای رفع مشکل دیتابیس

## ⚠️ توجه مهم:
دو روش برای رفع مشکل دیتابیس وجود دارد:

1. **روش امن (توصیه می‌شود)**: بدون حذف داده‌ها - فقط restart
2. **روش پاکسازی کامل**: حذف volume و ساخت مجدد (فقط در صورت مشکل شدید)

---

## 🔰 روش 1: رفع مشکل امن (بدون حذف داده‌ها)

```bash
# اسکریپت خودکار
./fix-database-safe.sh
```

یا دستی:

```bash
cd ~/davvvat-pro
docker-compose stop
docker-compose up -d mysql
sleep 30
docker-compose up -d
```

---

## 🔥 روش 2: پاکسازی کامل (حذف همه داده‌ها)

**⚠️ هشدار: این کار تمام داده‌های دیتابیس را پاک می‌کند!**

```bash
cd ~/davvvat-pro
git pull origin main

# حذف volume و پاکسازی کامل
docker-compose down -v
docker volume rm davvvat-pro_mysql_data

# راه‌اندازی مجدد (دیتابیس از dump ساخته می‌شود)
docker-compose up -d --build
sleep 30

# بررسی وضعیت
docker-compose ps
docker-compose logs backend | tail -20
```

**فقط در این موارد از روش 2 استفاده کنید:**
- دیتابیس خراب شده و قابل تعمیر نیست
- خطاهای مداوم MySQL که با restart حل نمی‌شود
- می‌خواهید با داده‌های تازه از dump شروع کنید

---

## دستورات تکمیلی:

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
