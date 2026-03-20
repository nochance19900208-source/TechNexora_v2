import { Router } from 'express';

export const contactRouter = Router();

contactRouter.post('/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    res.json({ status: 'ok', message: 'Message received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
