const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Brand = sequelize.define('Brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brandField: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatarSrc: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '/iconProfile.svg'
  }
}, {
  timestamps: true,
  tableName: 'brand' // Specify the existing table name
});

module.exports = Brand;
