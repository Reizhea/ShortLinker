import express from 'express';
const router = express.Router();
import { nanoid } from 'nanoid';
import URL from '../models/URL.js';

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
  
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }
  
    try {
      const shortCode = nanoid(8);
      const newUrl = new URL({ originalUrl, shortCode });
      await newUrl.save();
      res.json({ originalUrl, shortCode });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await URL.findOne({ shortCode });
    if (url) {
      url.clicks += 1;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
