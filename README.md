# 🌐 Full-Stack Web Application

یک اپلیکیشن تحت وب کامل با فرانت‌اند React/Next.js و بک‌اند Node.js/Express

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13-black.svg)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)](https://mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://typescriptlang.org/)

## ✨ ویژگی‌ها

### 🎨 Frontend (React/Next.js)
- ✅ رابط کاربری مدرن و زیبا
- ✅ سیستم احراز هویت (ورود و ثبت نام)
- ✅ مدیریت پروفایل کاربری
- ✅ طراحی ریسپانسیو
- ✅ استفاده از Tailwind CSS
- ✅ TypeScript برای type safety

### 🔧 Backend (Node.js/Express)
- ✅ API RESTful
- ✅ احراز هویت با JWT
- ✅ مدیریت کاربران
- ✅ اتصال به پایگاه داده MongoDB
- ✅ هش کردن رمز عبور با bcrypt
- ✅ CORS برای امنیت

## 🏗️ ساختار پروژه

```
pro/
├── frontend/          # React/Next.js Frontend
│   ├── components/    # کامپوننت‌های React
│   ├── pages/         # صفحات Next.js
│   ├── services/      # سرویس‌های API
│   └── ...
├── backend/           # Node.js/Express Backend
│   ├── src/
│   │   ├── config/    # تنظیمات پایگاه داده
│   │   ├── controllers/ # کنترلرها
│   │   ├── middleware/  # میدلورها
│   │   ├── models/      # مدل‌های Mongoose
│   │   └── routes/      # مسیرهای API
│   └── ...
├── setup.sh           # اسکریپت راه‌اندازی
└── README.md          # راهنمای کامل
```

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js (نسخه 14 یا بالاتر)
- npm یا yarn
- MongoDB (محلی یا ابری)

### 1. کلون کردن پروژه
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. راه‌اندازی سریع
```bash
# اجرای اسکریپت راه‌اندازی
./setup.sh
```

### 3. راه‌اندازی دستی

#### Backend
```bash
cd backend

# نصب وابستگی‌ها
npm install

# کپی کردن فایل محیطی
cp .env.example .env

# ویرایش فایل .env با تنظیمات خود
# MONGODB_URI=mongodb://localhost:27017/myapp
# JWT_SECRET=your-secret-key

# راه‌اندازی سرور توسعه
npm run dev
```

#### Frontend
```bash
cd frontend

# نصب وابستگی‌ها
npm install

# راه‌اندازی سرور توسعه
npm run dev
```

### 4. راه‌اندازی همزمان
```bash
# از پوشه اصلی پروژه
npm run dev
```

## 🌐 دسترسی

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 📚 API Endpoints

### احراز هویت
- `POST /api/auth/register` - ثبت نام کاربر جدید
- `POST /api/auth/login` - ورود کاربر
- `GET /api/auth/me` - دریافت اطلاعات کاربر فعلی

### مدیریت کاربران
- `GET /api/users` - دریافت همه کاربران (فقط مدیر)
- `GET /api/users/:id` - دریافت کاربر با ID
- `PUT /api/users/:id` - به‌روزرسانی کاربر

## 📱 صفحات Frontend

- `/` - صفحه اصلی
- `/login` - صفحه ورود/ثبت نام
- `/profile` - پروفایل کاربری

## 🛠️ تکنولوژی‌های استفاده شده

### Frontend
- **React 18** - کتابخانه UI
- **Next.js 13** - فریم‌ورک React
- **TypeScript** - زبان برنامه‌نویسی
- **Tailwind CSS** - فریم‌ورک CSS
- **Axios** - کتابخانه HTTP

### Backend
- **Node.js** - محیط اجرا
- **Express.js** - فریم‌ورک وب
- **MongoDB** - پایگاه داده
- **Mongoose** - ODM برای MongoDB
- **JWT** - احراز هویت
- **bcryptjs** - هش کردن رمز عبور
- **CORS** - امنیت

## 🔒 امنیت

- رمزهای عبور با bcrypt هش می‌شوند
- احراز هویت با JWT انجام می‌شود
- CORS برای امنیت تنظیم شده است
- ورودی‌ها اعتبارسنجی می‌شوند

## 🤝 مشارکت

1. پروژه را fork کنید
2. یک branch جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. به branch اصلی push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request ایجاد کنید

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 📞 پشتیبانی

برای سوالات و مشکلات، لطفاً issue ایجاد کنید.

---

⭐ اگر این پروژه برایتان مفید بود، لطفاً star دهید! # Trigger deployment
