Cloudflare Pages static site setup (quick)

1. Create a Cloudflare account and add the domain crisisreadysolutions.com to your Cloudflare dashboard.

2. In Cloudflare Pages, connect the GitHub repository eric4479/crisisreadysolutions and set Build settings:
   - Framework: None
   - Build command: (leave empty)
   - Build output directory: (root)

3. Deploy. This site is static HTML, CSS, JavaScript, and assets only. It does not require Pages Functions or environment variables.

4. Configure custom domain (crisisreadysolutions.com) in Pages and update DNS records in Cloudflare dashboard.

Notes:
- Leave the Functions directory setting blank.
- Contact links use email, phone, and Facebook directly.
