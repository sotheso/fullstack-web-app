const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// User model for authentication and profile
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      comment: 'شماره تلفن کاربر',
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'نام کاربر',
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'نام خانوادگی کاربر',
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
      comment: 'ایمیل کاربر',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'آیا شماره تلفن تایید شده است',
    },
    isProfileComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'آیا اطلاعات پروفایل تکمیل شده است',
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'آخرین ورود کاربر',
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'رمز عبور کاربر',
    },
  },
  {
    timestamps: true,
    tableName: 'user',
  }
);

module.exports = User;

