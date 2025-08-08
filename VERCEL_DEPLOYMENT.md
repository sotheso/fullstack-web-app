# 🚀 Vercel Deployment Guide

## 📋 مراحل Deploy در Vercel

### 1. اتصال به GitHub
- به [Vercel.com](https://vercel.com) بروید
- با GitHub account وارد شوید
- روی "New Project" کلیک کنید

### 2. انتخاب Repository
- Repository `sotheso/fullstack-web-app` را انتخاب کنید
- روی "Import" کلیک کنید

### 3. تنظیمات Deploy
- **Framework Preset:** Next.js
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 4. Environment Variables (اختیاری)
اگر نیاز به متغیرهای محیطی دارید:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### 5. Deploy
- روی "Deploy" کلیک کنید
- منتظر بمانید تا build کامل شود

## ⚠️ نکات مهم

### Frontend Only
- این deploy فقط **Frontend** را شامل می‌شود
- **Backend** باید جداگانه deploy شود (مثل Heroku, Railway, یا Render)

### API Configuration
- اگر backend را deploy کردید، URL آن را در environment variables قرار دهید
- در `frontend/services/api.ts` آدرس API را آپدیت کنید

### Database
- برای MongoDB، از MongoDB Atlas استفاده کنید
- Connection string را در backend environment variables قرار دهید

## 🔧 Troubleshooting

### اگر Build Fail شد:
1. مطمئن شوید که `frontend/package.json` وجود دارد
2. مطمئن شوید که Next.js در dependencies است
3. Build logs را بررسی کنید

### اگر Runtime Error داشتید:
1. Environment variables را بررسی کنید
2. API endpoints را بررسی کنید
3. Console errors را بررسی کنید

## 📞 پشتیبانی
برای مشکلات بیشتر، لطفاً issue در GitHub ایجاد کنید. 