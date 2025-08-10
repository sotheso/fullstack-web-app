# Backend API

This is a Node.js/Express backend API with MySQL database and JWT authentication.

## Features

- Express.js server
- MySQL database integration with Sequelize ORM
- JWT authentication
- User registration and login
- Password hashing with bcrypt
- CORS enabled
- Environment variable configuration

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=davvvat_db
   DB_USER=root
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. Make sure your MySQL database is running and the database `davvvat_db` exists.

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected route)
- `GET /api/users` - Get all users (protected route)

## Database

The application uses MySQL with Sequelize ORM. The database will be automatically synchronized when the server starts. 