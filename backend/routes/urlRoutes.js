import express from 'express';
const router = express.Router();
import { nanoid } from 'nanoid';
import URL from '../models/URL.js';
import validator from 'validator';


router.post('/shorten', async (req, res) => {
    const { originalUrl, customCode } = req.body;
  
    if (!originalUrl) {
      return res.status(400).json({ error: 'Please enter a URL' });
    }

    if (!validator.isURL(originalUrl, { require_protocol: true })) {
        return res.status(400).json({ error: 'Invalid URL format' });
      }
  
    const baseUrl = req.protocol + '://' + req.get('host');
  
    try {
      let shortCode;

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
        shortCode = nanoid(8);
      }
  
      let existingUrl = await URL.findOne({ originalUrl }).select('shortCode');
      if (existingUrl && !customCode) {
        const shortUrl = `${baseUrl}/${existingUrl.shortCode}`;
        return res.json({ shortUrl });
      }
  
      const newUrl = new URL({ originalUrl, shortCode });
      await newUrl.save();
  
      const shortUrl = `${baseUrl}/${shortCode}`;
      res.json({ shortUrl });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

export default router;