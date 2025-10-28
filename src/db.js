import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbPath = process.env.DB_PATH || './database.sqlite';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

export async function connectDB() {
  try {
    await sequelize.authenticate();
    ('Database connected');
  } catch (err) {
    console.error('DB connection error:', err.message);
    process.exit(1);
  }
}
