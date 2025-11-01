const { Sequelize } = require('sequelize');

// Use DATABASE_URL if available, otherwise fall back to individual variables
const databaseUrl = process.env.DATABASE_URL;

let sequelize;

if (databaseUrl) {
  // Auto-detect dialect from DATABASE_URL (e.g., mysql://, sqlite:, postgres://)
  const lowerUrl = databaseUrl.toLowerCase();
  const isMySQL = lowerUrl.startsWith('mysql://');

  const baseOptions = {
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    retry: {
      max: 3
    }
  };

  // Only apply MySQL-specific options when using MySQL
  const mysqlDialectOptions = process.env.DB_SSL === 'true' ? {
    ssl: {
      require: true,
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
    }
  } : {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  };

  sequelize = new Sequelize(databaseUrl, {
    ...(isMySQL ? { dialectOptions: mysqlDialectOptions } : {}),
    ...baseOptions
  });
} else {
  // Fallback to individual variables
  sequelize = new Sequelize(
    process.env.DB_NAME || 'DavvvatDB',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '11331133',
// for 
    // process.env.DB_PASSWORD || '',
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
    
    // Sync all models with database
    // In production, use alter: true to update schema without losing data
    const syncOptions = process.env.NODE_ENV === 'production' 
      ? { force: false, alter: true }  // Update schema in production
      : { force: false, alter: false }; // Don't alter in development
    
    await sequelize.sync(syncOptions);
    console.log('Database synchronized with options:', syncOptions);
  } catch (error) {
    console.error('Error connecting to MySQL Database:', error.message);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      parent: error.parent ? error.parent.message : null
    });
    
    // In production/Docker, retry connection
    if (process.env.NODE_ENV === 'production') {
      console.log('Retrying database connection in 5 seconds...');
      setTimeout(() => {
        connectDB();
      }, 5000);
    } else {
      // In development, throw to allow debugging
      throw error;
    }
  }
};

module.exports = { sequelize, connectDB };
