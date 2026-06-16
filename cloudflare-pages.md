Cloudflare Pages + Functions setup (quick)

1. Create a Cloudflare account and add the domain crisisreadysolutions.com to your Cloudflare dashboard.

2. In Cloudflare Pages, connect the GitHub repository eric4479/crisisreadysolutions and set Build settings:
   - Framework: None
   - Build command: (leave empty)
   - Build output directory: (root)  
   - Functions directory: functions

3. Add project environment variables (Pages > Settings > Environment variables) for production and preview:
   - GOOGLE_API_KEY (your Google Places API key)
   - PLACE_ID (the Google Place ID for the business)

4. Deploy. The Pages Functions endpoint will be available at:
   https://<your-pages-subdomain>/.netlify/functions/api/reviews  (Cloudflare Pages serves functions under /api/*)

   For Pages, the function is reachable at: https://<your-domain>/api/reviews

5. Configure custom domain (crisisreadysolutions.com) in Pages and update DNS records in Cloudflare dashboard.

Notes:
- Keep API key secret using Pages environment variables.
- The function caches responses for 6 hours.
- If you prefer a worker instead, use wrangler; Pages Functions is easiest when the site is hosted on Pages.
