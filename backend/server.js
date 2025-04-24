import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Client } from 'pg'
import Redis from 'ioredis'

dotenv.config()

const app = express()

const pgClient = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
})

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000', 'http://194.146.123.160']

app.use(cors({
  origin: corsOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date(),
    services: {
      postgres: 'unknown',
      redis: 'unknown'
    }
  }

  try {
    await pgClient.query('SELECT 1')
    health.services.postgres = 'ok'
  } catch {
    health.services.postgres = 'error'
    health.status = 'error'
  }

  try {
    await redisClient.ping()
    health.services.redis = 'ok'
  } catch {
    health.services.redis = 'error'
    health.status = 'error'
  }

  res.json(health)
})

app.get('/api/podcasts', async (req, res) => {
  try {
    const podcasts = [
      { id: 1, title: "Podcast 1", file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: 2, title: "Podcast 2", file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { id: 3, title: "Podcast 3", file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
    ]
    res.json(podcasts)
  } catch (error) {
    console.error('Error fetching podcasts:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

const PORT = process.env.PORT || 4001

async function startServer() {
  try {
    await pgClient.connect()
    console.log('Connected to PostgreSQL')

    await redisClient.ping()
    console.log('Connected to Redis')

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend running on port ${PORT}`)
      console.log(`CORS enabled for origins: ${corsOrigins.join(', ')}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()