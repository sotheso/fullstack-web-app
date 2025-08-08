# Web Application with React/Next.js Frontend and Node.js Backend

این یک اپلیکیشن تحت وب کامل است که شامل فرانت‌اند React/Next.js و بک‌اند Node.js/Express می‌باشد.

## ویژگی‌ها

### Frontend (React/Next.js)
- رابط کاربری مدرن و زیبا
- سیستم احراز هویت (ورود و ثبت نام)
- مدیریت پروفایل کاربری
- طراحی ریسپانسیو
- استفاده از Tailwind CSS

### Backend (Node.js/Express)
- API RESTful
- احراز هویت با JWT
- مدیریت کاربران
- اتصال به پایگاه داده MongoDB
- هش کردن رمز عبور با bcrypt

## ساختار پروژه

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
└── README.md
```

## نصب و راه‌اندازی

### پیش‌نیازها
- Node.js (نسخه 14 یا بالاتر)
- npm یا yarn
- MongoDB (محلی یا ابری)

### 1. راه‌اندازی Backend

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

Backend روی پورت 5000 اجرا می‌شود: `http://localhost:5000`

### 2. راه‌اندازی Frontend

```bash
cd frontend

# نصب وابستگی‌ها
npm install

# راه‌اندازی سرور توسعه
npm run dev
```

Frontend روی پورت 3000 اجرا می‌شود: `http://localhost:3000`

## API Endpoints

### احراز هویت
- `POST /api/auth/register` - ثبت نام کاربر جدید
- `POST /api/auth/login` - ورود کاربر
- `GET /api/auth/me` - دریافت اطلاعات کاربر فعلی

### مدیریت کاربران
- `GET /api/users` - دریافت همه کاربران (فقط مدیر)
- `GET /api/users/:id` - دریافت کاربر با ID
- `PUT /api/users/:id` - به‌روزرسانی کاربر

## صفحات Frontend

- `/` - صفحه اصلی
- `/login` - صفحه ورود/ثبت نام
- `/profile` - پروفایل کاربری

## استفاده

1. ابتدا Backend را راه‌اندازی کنید
2. سپس Frontend را راه‌اندازی کنید
3. به آدرس `http://localhost:3000` بروید
4. برای استفاده از سیستم احراز هویت، ابتدا ثبت نام کنید

## تکنولوژی‌های استفاده شده

### Frontend
- React 18
- Next.js 13
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS

## توسعه

### اضافه کردن ویژگی‌های جدید
1. مدل‌های جدید را در `backend/src/models/` اضافه کنید
2. کنترلرهای مربوطه را در `backend/src/controllers/` ایجاد کنید
3. مسیرهای API را در `backend/src/routes/` تعریف کنید
4. کامپوننت‌های React را در `frontend/components/` اضافه کنید
5. صفحات جدید را در `frontend/pages/` ایجاد کنید

## امنیت
- رمزهای عبور با bcrypt هش می‌شوند
- احراز هویت با JWT انجام می‌شود
- CORS برای امنیت تنظیم شده است
- ورودی‌ها اعتبارسنجی می‌شوند

## پشتیبانی
برای سوالات و مشکلات، لطفاً issue ایجاد کنید. 