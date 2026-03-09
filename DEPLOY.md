# Deploying Normie Gallery to Netlify

## 1. Connect GitHub

1. Go to [app.netlify.com](https://app.netlify.com) and sign in
2. **Add new site** → **Import an existing project**
3. Choose **GitHub** and authorize Netlify
4. Select **acidmaneth/NormieGallery**

## 2. Add Environment Variables

Before deploying, add your API keys in Netlify:

1. In the Netlify deploy setup, click **Show advanced** (or go to **Site settings** → **Environment variables** after the first deploy)
2. Add these variables:

| Variable | Value | Required |
|----------|-------|----------|
| `ALCHEMY_API_KEY` | Your Alchemy API key | Yes (for NFT loading) |
| `WC_PROJECT_ID` | Your WalletConnect Project ID | Yes (for WalletConnect modal) |
| `DELEGATE_API_KEY` | Your Delegate.xyz API key | No (optional, for higher rate limits) |

3. Click **Deploy site**

## 3. Build Configuration

Netlify will run `node scripts/build-config.js` during build. This script:
- Reads the environment variables above
- Writes `config.js` with your keys
- The site loads `config.js` (never committed to git)

## 4. Local Development

For local dev, either:

**Option A:** Run the build script (uses `config.local.js` if no env vars):
```bash
node scripts/build-config.js
```

**Option B:** Copy your keys into `config.js`:
```bash
cp config.local.js config.js
```

Then serve the site (e.g. `python3 -m http.server 8080`).
