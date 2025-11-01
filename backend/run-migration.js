const { sequelize } = require('./src/config/database');
const migration = require('./src/migrations/add-registered-events');

async function runMigration() {
  try {
    console.log('🔄 Starting migration: add-registered-events');
    console.log('─'.repeat(50));
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✓ Database connection established');
    
    // Run migration
    await migration.up(sequelize.getQueryInterface(), sequelize.constructor);
    
    console.log('─'.repeat(50));
    console.log('✅ Migration completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('─'.repeat(50));
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();

