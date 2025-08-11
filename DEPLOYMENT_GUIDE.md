# راهنمای دیپلوی پروژه Davvvat

## مرحله 1: ساخت دیتابیس ابری

### گزینه A: PlanetScale (رایگان)
1. به [planetscale.com](https://planetscale.com) برو
2. حساب بساز و یک دیتابیس جدید بساز
3. از تب "Connect" اطلاعات اتصال را کپی کن:
   - Host
   - Username  
   - Password
   - Database name
4. فایل `database_dump.sql` را در تب "Console" ایمپورت کن

### گزینه B: Railway MySQL (رایگان)
1. به [railway.app](https://railway.app) برو
2. حساب بساز و یک پروژه جدید بساز
3. "Add Service" → "Database" → "MySQL"
4. از تب "Connect" اطلاعات اتصال را کپی کن
5. فایل `database_dump.sql` را ایمپورت کن

## مرحله 2: دیپلوی بک‌اند

### گزینه A: Render (رایگان)
1. به [render.com](https://render.com) برو
2. حساب بساز و "New Web Service" انتخاب کن
3. ریپو GitHub را اتصال کن
4. تنظیمات:
   - **Name**: `davvvat-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: خالی بگذار

5. متغیرهای محیطی را اضافه کن:
   ```
   NODE_ENV=production
   PORT=5001
   JWT_SECRET=یک-مقدار-قوی-تصادفی
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_USER=your-mysql-user
   DB_PASSWORD=your-mysql-password
   DB_NAME=DavvvatDB
   ALLOWED_ORIGIN=https://sotheso.github.io
   ```

6. اگر دیتابیس SSL نیاز دارد:
   ```
   DB_SSL=true
   DB_SSL_REJECT_UNAUTHORIZED=false
   ```

### گزینه B: Railway (رایگان)
1. به [railway.app](https://railway.app) برو
2. "Add Service" → "GitHub Repo" انتخاب کن
3. ریپو را اتصال کن
4. تنظیمات:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. متغیرهای محیطی را اضافه کن (همان بالا)

## مرحله 3: فعال‌سازی GitHub Pages

1. در ریپو GitHub → Settings → Pages
2. Source: "GitHub Actions" انتخاب کن
3. در Settings → Secrets and variables → Actions:
   - سکرت جدید: `NEXT_PUBLIC_API_URL`
   - مقدار: `https://your-backend-url.onrender.com/api` (یا Railway URL)

## مرحله 4: تست

1. یک کامیت/پوش جدید بزن
2. GitHub Actions اجرا می‌شود
3. فرانت‌اند روی `https://sotheso.github.io/pro/` بالا می‌آید
4. بک‌اند روی URL Render/Railway در دسترس است

## نکات مهم

- دیتابیس باید از قبل ساخته شده باشد
- متغیرهای محیطی باید دقیقاً مطابق با دیتابیس ابری باشند
- CORS در بک‌اند برای GitHub Pages تنظیم شده
- فرانت‌اند به صورت استاتیک روی Pages اجرا می‌شود
