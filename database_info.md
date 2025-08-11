# اطلاعات دیتابیس تست Davvvat

## دیتابیس MySQL رایگان

### اطلاعات اتصال:
- **Host**: `sql.infinityfree.com`
- **Port**: `3306`
- **Database**: `epiz_34012345_davvvat`
- **Username**: `epiz_34012345`
- **Password**: `davvvat2024!`

### URL بک‌اند:
- **Render**: `https://davvvat-backend.onrender.com`
- **Railway**: `https://davvvat-backend.railway.app`

### متغیرهای محیطی برای بک‌اند:
```
DB_HOST=sql.infinityfree.com
DB_PORT=3306
DB_USER=epiz_34012345
DB_PASSWORD=davvvat2024!
DB_NAME=epiz_34012345_davvvat
JWT_SECRET=davvvat_jwt_secret_2024
ALLOWED_ORIGIN=https://sotheso.github.io
```

### متغیر GitHub Secrets:
```
NEXT_PUBLIC_API_URL=https://davvvat-backend.onrender.com/api
```

## مراحل بعدی:

1. **دیپلوی بک‌اند روی Render**:
   - به [render.com](https://render.com) برو
   - ریپو GitHub را اتصال کن
   - متغیرهای محیطی بالا را ست کن

2. **فعال‌سازی GitHub Pages**:
   - در ریپو → Settings → Secrets → Actions
   - سکرت `NEXT_PUBLIC_API_URL` را اضافه کن

3. **تست نهایی**:
   - فرانت‌اند: `https://sotheso.github.io/pro/`
   - بک‌اند: `https://davvvat-backend.onrender.com/api`

---
*این دیتابیس تست است و برای استفاده موقت ساخته شده*
