const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Event model based on EventCard needs
const Event = sequelize.define(
  'Event',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/banner.png',
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // MySQL JSON type (5.7+) is supported by Sequelize; stores array of strings
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    filterTag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'بازارچه',
    },
    detailsLink: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/details',
    },
    // فیلدهای اضافی برای صفحه جزئیات
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: 'آرایه‌ای از URL های تصاویر برای گالری',
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'آدرس محل برگزاری ایونت',
    },
    mapUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'لینک نقشه گوگل',
    },
    timeDetails: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'جزئیات زمان برگزاری (مثل: ۲۵ فروردین الی ۳ اسفند - از ساعت ۲۲ تا ۴ صبح)',
    },
    programs: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: 'برنامه‌های ایونت (آرایه‌ای از اشیاء شامل day، date، description)',
    },
    brands: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: 'برندهای شرکت‌کننده (آرایه‌ای از اشیاء شامل id، name، isSelected)',
    },
    isExpired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'آیا ایونت منقضی شده است؟ (true = منقضی شده)',
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'شناسه برند مرتبط با ایونت',
    },
    hosts: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      comment: 'میزبان‌های ایونت (JSON)',
    },
    users: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      comment: 'کاربران شرکت‌کننده (JSON)',
    },
    camment: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'کامنت یا یادداشت اضافی',
    },
  },
  {
    timestamps: true,
    tableName: 'Event',
  }
);

module.exports = Event;


