import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://194.146.123.160',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get('/api/podcasts', (req, res) => {
  const podcasts = [
    { id: 1, title: "Podcast 1", file_url: "http://example.com/podcast1.mp3" },
    { id: 2, title: "Podcast 2", file_url: "http://example.com/podcast2.mp3" },
    { id: 3, title: "Podcast 3", file_url: "http://example.com/podcast3.mp3" },
    { id: 4, title: "Podcast 4", file_url: "http://194.146.123.160:9000/podcasts/1744379713653-test.mp3" },
    { id: 5, title: "Podcast 5", file_url: "http://194.146.123.160:9000/podcasts/1744381792263-05. I Don't Like Trains.mp3" },
  ];
  res.json(podcasts);
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});