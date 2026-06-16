Local Reviews API and Frontend

1. Create a .env in repo root from .env.example and fill:
   GOOGLE_API_KEY=YOUR_KEY
   PLACE_ID=YOUR_PLACE_ID
   PORT=3000

2. Install server deps and run locally:
   cd server
   npm install
   npm start

3. The server exposes /api/reviews which returns up to 5 reviews from Places Details. The frontend (index.html) loads public/js/reviews.js which fetches /api/reviews and renders a 5-item carousel.

Notes:
- Keep your API key secret; do not commit .env.
- If you own the business, consider using Google Business Profile API for full reviews.
