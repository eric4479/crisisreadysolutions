require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

let cache = { ts: 0, data: null };
const TTL = parseInt(process.env.CACHE_TTL_SEC || '21600', 10); // seconds

app.use(cors());
app.use(express.json());

app.get('/api/reviews', async (req, res) => {
  try {
    const now = Date.now();
    if (cache.data && (now - cache.ts) < TTL * 1000) {
      return res.json({ source: 'cache', cached_at: cache.ts, reviews: cache.data });
    }

    const key = process.env.GOOGLE_API_KEY;
    const placeId = process.env.PLACE_ID;

    if (!key || !placeId) {
      const sample = [
        { author: 'Jane D.', rating: 5, text: 'Excellent, professional training. Highly recommend.', time: '2026-01-15', source: 'sample' },
        { author: 'Mark S.', rating: 5, text: 'Instructor was fantastic and engaging.', time: '2025-09-12', source: 'sample' },
        { author: 'Olivia R.', rating: 4, text: 'Great class, learned a lot.', time: '2025-06-03', source: 'sample' }
      ];
      cache = { ts: now, data: sample };
      return res.json({ source: 'sample', reviews: sample });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,reviews,url&key=${encodeURIComponent(key)}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Places API error ${r.status}`);
    const body = await r.json();
    const reviews = (body.result && body.result.reviews) ? body.result.reviews.slice(0,5).map(r => ({ author: r.author_name, rating: r.rating, text: r.text, time: new Date((r.time||0)*1000).toISOString(), profile_url: r.author_url })) : [];

    cache = { ts: now, data: reviews };
    res.json({ source: 'places', name: (body.result && body.result.name) || null, reviews });
  } catch (err) {
    console.error('Error /api/reviews', err);
    res.status(500).json({ error: 'Internal error fetching reviews' });
  }
});

// Serve static site (if you want to run server alongside static files)
app.use(express.static(''));

app.listen(PORT, () => console.log(`Reviews API server listening on ${PORT}`));
