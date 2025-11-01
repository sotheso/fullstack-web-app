const { DataTypes } = require('sequelize');

/**
 * Migration: Add registeredEvents field to User table
 * This field stores an array of event IDs that user has registered for
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('Starting migration: add-registered-events');
      
      // Check if column already exists
      const tableDescription = await queryInterface.describeTable('user');
      
      if (!tableDescription.registeredEvents) {
        await queryInterface.addColumn('user', 'registeredEvents', {
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: '[]',
          comment: 'Array of event IDs (stored as JSON) that user registered for',
        });
        console.log('✓ Added registeredEvents column to user table');
      } else {
        console.log('✓ registeredEvents column already exists');
      }
      
      console.log('Migration completed successfully');
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log('Rolling back migration: add-registered-events');
      
      await queryInterface.removeColumn('user', 'registeredEvents');
      console.log('✓ Removed registeredEvents column from user table');
      
      console.log('Rollback completed successfully');
    } catch (error) {
      console.error('Rollback failed:', error);
      throw error;
    }
  },
};

