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
    } : {
      // Add these options to fix connection issues
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      supportBigNumbers: true,
      bigNumberStrings: true
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    retry: {
      max: 3
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
      } : {
        // Add these options to fix connection issues
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
      },
      pool: {
        max: 10,
        min: 0,
        acquire: 60000,
        idle: 10000
      },
      retry: {
        max: 3
      }
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected Successfully');
    
    // Sync all models with database (use force: false to avoid data loss)
    await sequelize.sync({ alter: false });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error connecting to MySQL Database:', error.message);
    // Don't exit process, let it retry
    throw error;
  }
};

module.exports = { sequelize, connectDB };
