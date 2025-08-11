const { Sequelize } = require('sequelize');

// Use DATABASE_URL if available, otherwise fall back to individual variables
const databaseUrl = process.env.DATABASE_URL;

let sequelize;

if (databaseUrl) {
  // Parse DATABASE_URL (format: mysql://user:password@host:port/database)
  sequelize = new Sequelize(databaseUrl, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
      }
    } : {},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  // Fallback to individual variables
  sequelize = new Sequelize(
    process.env.DB_NAME || 'DavvvatDB',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '11331133',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
      dialectOptions: process.env.DB_SSL === 'true' ? {
        ssl: {
          require: true,
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
        }
      } : {},
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected Successfully');
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error connecting to MySQL Database:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
