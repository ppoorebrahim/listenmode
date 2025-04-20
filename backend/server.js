import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';
import Redis from 'ioredis';
import { Client as MinioClient } from 'minio';

// Load environment variables
dotenv.config();

const app = express();

// Initialize clients
const pgClient = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
});

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const minioClient = new MinioClient({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

// Parse CORS origins from environment variable
const corsOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'];

app.use(cors({
  origin: corsOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date(),
    services: {
      postgres: 'unknown',
      redis: 'unknown',
      minio: 'unknown'
    }
  };

  try {
    await pgClient.query('SELECT 1');
    health.services.postgres = 'ok';
  } catch (error) {
    health.services.postgres = 'error';
    health.status = 'error';
  }

  try {
    await redisClient.ping();
    health.services.redis = 'ok';
  } catch (error) {
    health.services.redis = 'error';
    health.status = 'error';
  }

  try {
    await minioClient.listBuckets();
    health.services.minio = 'ok';
  } catch (error) {
    health.services.minio = 'error';
    health.status = 'error';
  }

  res.json(health);
});

app.get('/api/podcasts', async (req, res) => {
  try {
    const podcasts = [
      { id: 1, title: "Podcast 1", file_url: "http://example.com/podcast1.mp3" },
      { id: 2, title: "Podcast 2", file_url: "http://example.com/podcast2.mp3" },
      { id: 3, title: "Podcast 3", file_url: "http://example.com/podcast3.mp3" },
      { id: 4, title: "Podcast 4", file_url: `${process.env.MINIO_URL}/podcasts/1744379713653-test.mp3` },
      { id: 5, title: "Podcast 5", file_url: `${process.env.MINIO_URL}/podcasts/1744381792263-05. I Don't Like Trains.mp3` },
    ];
    res.json(podcasts);
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 4001;

// Connect to services before starting the server
async function startServer() {
  try {
    await pgClient.connect();
    console.log('Connected to PostgreSQL');

    await redisClient.ping();
    console.log('Connected to Redis');

    await minioClient.listBuckets();
    console.log('Connected to MinIO');

    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
      console.log(`CORS enabled for origins: ${corsOrigins.join(', ')}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
