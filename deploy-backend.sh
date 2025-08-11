#!/bin/bash

echo "🚀 شروع دیپلوی بک‌اند Davvvat..."

# بررسی وجود فایل‌های لازم
if [ ! -f "database_dump.sql" ]; then
    echo "❌ فایل database_dump.sql پیدا نشد!"
    echo "لطفاً اول دیتابیس را خروجی بگیرید:"
    echo "/usr/local/mysql/bin/mysqldump -u root -p11331133 --databases DavvvatDB > database_dump.sql"
    exit 1
fi

echo "✅ فایل دیتابیس موجود است"

# راهنمایی برای دیپلوی
echo ""
echo "📋 مراحل دیپلوی:"
echo ""
echo "1️⃣  دیتابیس ابری بساز:"
echo "   - PlanetScale: https://planetscale.com"
echo "   - یا Railway MySQL: https://railway.app"
echo ""
echo "2️⃣  فایل database_dump.sql را در دیتابیس ابری ایمپورت کن"
echo ""
echo "3️⃣  بک‌اند را دیپلوی کن:"
echo "   - Render: https://render.com"
echo "   - یا Railway: https://railway.app"
echo ""
echo "4️⃣  متغیرهای محیطی را ست کن:"
echo "   DB_HOST=your-mysql-host"
echo "   DB_USER=your-mysql-user" 
echo "   DB_PASSWORD=your-mysql-password"
echo "   DB_NAME=DavvvatDB"
echo "   JWT_SECRET=یک-مقدار-قوی"
echo "   ALLOWED_ORIGIN=https://sotheso.github.io"
echo ""
echo "5️⃣  URL بک‌اند را در GitHub Secrets ست کن:"
echo "   NEXT_PUBLIC_API_URL=https://your-backend-url/api"
echo ""
echo "📖 راهنمای کامل در DEPLOYMENT_GUIDE.md"
echo ""
echo "🎯 پس از دیپلوی، فرانت‌اند روی https://sotheso.github.io/pro/ در دسترس خواهد بود"
