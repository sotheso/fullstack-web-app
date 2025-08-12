# 🐳 Davvvat Project Docker Deployment Guide

این راهنما به شما کمک می‌کند تا پروژه Davvvat را روی VPS با Docker راه‌اندازی کنید.

## 📋 پیش‌نیازها

قبل از شروع، مطمئن شوید که موارد زیر روی VPS شما نصب شده‌اند:

- ✅ Docker (نسخه 20.10 یا بالاتر)
- ✅ Docker Compose (نسخه 2.0 یا بالاتر)
- ✅ Git

## 🚀 مراحل راه‌اندازی

### 1. کلون کردن پروژه
```bash
git clone <your-repository-url>
cd pro
```

### 2. تنظیم متغیرهای محیطی
```bash
cp env.example .env
nano .env  # یا هر ویرایشگر متنی که ترجیح می‌دهید
```

مقادیر پیشنهادی برای `.env`:
```env
# Database Configuration
MYSQL_ROOT_PASSWORD=your_secure_password_here
MYSQL_DATABASE=DavvvatDB
MYSQL_USER=davvvat_user
MYSQL_PASSWORD=your_secure_password_here

# Backend Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
ALLOWED_ORIGIN=http://yourdomain.com

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://yourdomain.com/api
```

### 3. اجرای اسکریپت deployment
```bash
./deploy.sh
```

یا به صورت دستی:
```bash
docker-compose up --build -d
```

### 4. بررسی وضعیت سرویس‌ها
```bash
docker-compose ps
docker-compose logs -f
```

## 🌐 دسترسی به سرویس‌ها

پس از راه‌اندازی موفق:

- **Frontend**: `http://your-server-ip:3000`
- **Backend API**: `http://your-server-ip:5001`
- **Nginx Proxy**: `http://your-server-ip:80`
- **Database**: `your-server-ip:3306`

## 🔧 دستورات مفید

### مدیریت سرویس‌ها
```bash
# مشاهده لاگ‌ها
docker-compose logs -f

# توقف سرویس‌ها
docker-compose down

# راه‌اندازی مجدد
docker-compose restart

# به‌روزرسانی
docker-compose pull && docker-compose up -d
```

### مدیریت دیتابیس
```bash
# دسترسی به MySQL
docker exec -it davvvat_mysql mysql -u root -p

# پشتیبان‌گیری
docker exec davvvat_mysql mysqldump -u root -p DavvvatDB > backup.sql

# بازگردانی
docker exec -i davvvat_mysql mysql -u root -p DavvvatDB < backup.sql
```

### پاک‌سازی
```bash
# حذف کانتینرها و شبکه‌ها
docker-compose down --volumes --remove-orphans

# حذف تصاویر
docker system prune -a

# حذف volume های دیتابیس
docker volume rm pro_mysql_data
```

## 🔒 امنیت

### Firewall
```bash
# باز کردن پورت‌های مورد نیاز
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS (اگر SSL دارید)
sudo ufw enable
```

### SSL/HTTPS (اختیاری)
برای فعال‌سازی HTTPS:

1. گواهی SSL تهیه کنید (Let's Encrypt رایگان است)
2. فایل‌های گواهی را در `nginx/ssl/` قرار دهید
3. بخش HTTPS در `nginx/nginx.conf` را فعال کنید
4. `docker-compose.yml` را به‌روزرسانی کنید

## 📊 مانیتورینگ

### بررسی سلامت سرویس‌ها
```bash
# Health check endpoint
curl http://your-server-ip/health

# بررسی وضعیت کانتینرها
docker stats
```

### لاگ‌ها
```bash
# لاگ‌های همه سرویس‌ها
docker-compose logs -f

# لاگ‌های سرویس خاص
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

## 🚨 عیب‌یابی

### مشکلات رایج

#### 1. پورت در حال استفاده
```bash
# بررسی پورت‌های در حال استفاده
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :5001

# توقف سرویس‌های متضاد
sudo systemctl stop nginx  # اگر nginx سیستم نصب است
```

#### 2. مشکل دسترسی به دیتابیس
```bash
# بررسی اتصال دیتابیس
docker exec -it davvvat_mysql mysql -u davvvat_user -p

# بررسی لاگ‌های MySQL
docker logs davvvat_mysql
```

#### 3. مشکل در build
```bash
# پاک‌سازی cache
docker system prune -a
docker volume prune

# rebuild کامل
docker-compose build --no-cache
```

## 📈 بهینه‌سازی

### تنظیمات MySQL
```bash
# ویرایش تنظیمات MySQL در docker-compose.yml
environment:
  MYSQL_INNODB_BUFFER_POOL_SIZE: 256M
  MYSQL_MAX_CONNECTIONS: 200
```

### تنظیمات Nginx
```bash
# فعال‌سازی gzip compression
# فعال‌سازی caching
# تنظیم rate limiting
```

## 🔄 به‌روزرسانی

### به‌روزرسانی کد
```bash
git pull origin main
docker-compose down
docker-compose up --build -d
```

### به‌روزرسانی Docker
```bash
docker-compose pull
docker-compose up -d
```

## 📞 پشتیبانی

اگر با مشکلی مواجه شدید:

1. لاگ‌ها را بررسی کنید: `docker-compose logs`
2. وضعیت سرویس‌ها را چک کنید: `docker-compose ps`
3. منابع سیستم را بررسی کنید: `docker stats`
4. مستندات Docker را مطالعه کنید

---

**نکته**: این راهنما برای محیط production است. برای development از `docker-compose.dev.yml` استفاده کنید.
