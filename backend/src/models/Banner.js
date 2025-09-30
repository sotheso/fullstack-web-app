const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Banner = sequelize.define(
  'Banner',
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
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    detailsLink: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/details',
    },
  },
  {
    timestamps: true,
    tableName: 'Banner',
  }
);

module.exports = Banner;


