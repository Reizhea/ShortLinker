import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import URL from './models/URL.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

import urlRoutes from './routes/urlRoutes.js';
app.use('/api/urls', urlRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
  
    try {
      const url = await URL.findOne({ shortCode });
      if (url) {
        await url.save();
        return res.redirect(url.originalUrl); 
      } else {
        const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
      return res.redirect(`${frontendBaseUrl}/404`);
      }
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  