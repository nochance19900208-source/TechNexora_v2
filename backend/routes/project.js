import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const projectRouter = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const ext = path.extname(file.originalname) || '';
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
}).array('attachments', 3);

const RECIPIENT_EMAIL = 'support@technexora.co';

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function formatProjectEmail(data, fileNames = []) {
  const lines = [
    `Client name: ${data.clientName}`,
    `Client country: ${data.clientCountry || '-'}`,
    `LinkedIn: ${data.linkedinUrl || '-'}`,
    `Project category: ${data.projectCategory || '-'}`,
    `Project skill: ${data.projectSkill || '-'}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    '',
    '--- Project summary ---',
    data.projectSummary,
  ];
  if (data.other) {
    lines.push('', '--- Other ---', data.other);
  }
  if (fileNames.length) {
    lines.push('', '--- Attachments ---', ...fileNames);
  }
  return lines.join('\n');
}

projectRouter.post('/project', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Maximum 200MB per file.' });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ error: 'Maximum 3 files allowed.' });
      }
      return res.status(400).json({ error: err.message || 'File upload failed.' });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { clientName, projectCategory, projectSummary, phone, email } = req.body;

    if (!clientName || !projectSummary || !phone || !email) {
      return res.status(400).json({
        error: 'Missing required fields: client name, project summary, phone, and email are required.',
      });
    }
    if (!projectCategory || !String(projectCategory).trim()) {
      return res.status(400).json({
        error: 'Please select a category.',
      });
    }

    const fileNames = (req.files || []).map((f) => `${f.originalname} (saved: ${f.filename})`);

    const transporter = buildTransporter();
    if (!transporter) {
      console.error('SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in environment.');
      return res.status(503).json({
        error: 'Email service is not configured. Please contact the site administrator.',
      });
    }

    const text = formatProjectEmail(req.body, fileNames);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `[Project Proposal] ${clientName} - ${req.body.projectSkill || 'New project'}`,
      text,
    });

    res.json({ status: 'ok', message: 'Project submitted successfully' });
  } catch (err) {
    console.error('Project submit error:', err);
    res.status(500).json({ error: 'Failed to submit project. Please try again later.' });
  }
});
