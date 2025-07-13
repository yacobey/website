# Custom Domain Setup Guide: selamcpa.com

## Current Status
Your website is ready to connect to **selamcpa.com**. The code has been updated to automatically detect and use your custom domain.

## Steps to Connect Your Domain

### 1. Purchase Domain (if not already owned)
- Go to a domain registrar like GoDaddy, Namecheap, or Cloudflare
- Purchase **selamcpa.com**
- Note: You'll need access to DNS settings

### 2. Configure DNS Settings
In your domain registrar's DNS panel, add these records:

**A Record:**
- Name: `@` (or blank for root domain)
- Value: Replit's IP address (see Replit dashboard)
- TTL: 300 (or default)

**CNAME Record:**
- Name: `www`
- Value: Your Replit domain (`e26ca02e-d597-4e53-a44f-bc802efa5631-00-1hjejlmw99sbo.kirk.replit.dev`)
- TTL: 300 (or default)

### 3. Connect Domain in Replit
1. Go to your Replit project dashboard
2. Click on your repl name at the top
3. Go to the "Settings" tab
4. Scroll down to "Custom Domain"
5. Enter: `selamcpa.com`
6. Click "Connect Domain"

### 4. Set Environment Variable
In your Replit project:
1. Go to "Secrets" tab (lock icon in left sidebar)
2. Add new secret:
   - Key: `CUSTOM_DOMAIN`
   - Value: `selamcpa.com`

## What Happens After Connection

### Automatic Domain Detection
Your website will automatically:
- Use `https://selamcpa.com` in sitemap.xml
- Use `https://selamcpa.com` in robots.txt
- Update all SEO canonical URLs
- Redirect www to root domain

### SSL Certificate
Replit automatically provides SSL certificates for custom domains, so your site will be secure at `https://selamcpa.com`.

### Search Engine Benefits
- Much better for SEO than Replit subdomain
- Professional appearance for users
- Easier to remember and share
- Better trust indicators for visitors

## Verification Steps

Once connected, verify these work:
1. `https://selamcpa.com` loads your website
2. `https://www.selamcpa.com` redirects to root
3. `https://selamcpa.com/sitemap.xml` shows correct URLs
4. `https://selamcpa.com/robots.txt` shows correct sitemap URL

## Troubleshooting

### DNS Propagation
- DNS changes can take 24-48 hours to fully propagate
- Use online DNS checker tools to verify propagation
- Clear your browser cache when testing

### Common Issues
- **Domain not connecting**: Check DNS records are correct
- **SSL errors**: Wait for Replit to provision certificate (can take up to 24 hours)
- **Mixed content**: Ensure all resources use HTTPS

## Current Configuration
Your code is already set up to:
- ✅ Detect custom domain automatically
- ✅ Use selamcpa.com in sitemap when available
- ✅ Use selamcpa.com in robots.txt when available
- ✅ Fallback to Replit domain if custom domain not set
- ✅ All SEO tags ready for custom domain

## Next Steps
1. Purchase selamcpa.com domain
2. Configure DNS settings
3. Connect domain in Replit dashboard
4. Add CUSTOM_DOMAIN environment variable
5. Test and verify everything works

Your website is fully prepared for the domain connection!