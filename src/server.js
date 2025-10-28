import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

import { connectDB, sequelize } from './db.js';
import './models/index.js';
import authRoutes from './routes/auth.js';
import collectableRoutes from './routes/collectables.js';

const app = express();

/* ---- Security + CORS go BEFORE your routes ---- */
app.use(helmet()); // safe HTTP headers

// Allow your front-ends to call the API (edit CORS_ORIGINS in .env)
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// If CORS_ORIGINS is empty -> allow all (dev convenience)
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false, // set true only if you use cookies/auth over CORS
}));

// JSON body parsing
app.use(express.json());
/* ----------------------------------------------- */

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'collectables_store_api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/collectables', collectableRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();
  await sequelize.sync();
  
  app.listen(PORT, () => {
    
  });
}

start();

