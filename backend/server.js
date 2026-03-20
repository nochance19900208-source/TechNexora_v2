import express from 'express';
import cors from 'cors';
import { contactRouter } from './routes/contact.js';
import { projectRouter } from './routes/project.js';

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://technexora-v2.vercel.app', 'https://www.technexora.net'],
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'TechNeoxra API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', contactRouter);
app.use('/api', projectRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
