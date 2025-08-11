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
  },
  {
    timestamps: true,
    tableName: 'Event',
  }
);

module.exports = Event;


