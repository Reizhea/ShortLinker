import express from 'express';
const router = express.Router();
import { nanoid } from 'nanoid';
import URL from '../models/URL.js';
import validator from 'validator';


router.post('/shorten', async (req, res) => {
    const { originalUrl, customCode } = req.body;
  
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }
  
    // URL validation
    if (!validator.isURL(originalUrl, { require_protocol: true })) {
        return res.status(400).json({ error: 'Invalid URL format' });
      }
  
    const baseUrl = req.protocol + '://' + req.get('host');
  
    try {
      let shortCode;
  
      // Custom code logic with length restriction
      if (customCode) {
        if (customCode.length > 10) {
          return res.status(400).json({ error: 'Custom code exceeds maximum length of 10 characters.' });
        }
  
        const existingCode = await URL.findOne({ shortCode: customCode });
        if (existingCode) {
          return res.status(400).json({ error: 'Custom code is already in use.' });
        }
        shortCode = customCode;
      } else {
        shortCode = nanoid(8); // Generate random short code
      }
  
      // Check for existing URL
      let existingUrl = await URL.findOne({ originalUrl }).select('shortCode');
      if (existingUrl && !customCode) {
        const shortUrl = `${baseUrl}/${existingUrl.shortCode}`;
        return res.json({ shortUrl });
      }
  
      // Save new URL
      const newUrl = new URL({ originalUrl, shortCode });
      await newUrl.save();
  
      const shortUrl = `${baseUrl}/${shortCode}`;
      res.json({ shortUrl });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await URL.findOne({ shortCode });
    if (url) {
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
