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
        url.clicks += 1; // Increment click count
        await url.save();
        return res.redirect(url.originalUrl); // Redirect to original URL
      } else {
        return res.status(404).json({ error: 'Short URL not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  