#!/usr/bin/env node
/**
 * Build script: generates config.js from environment variables (Netlify)
 * or copies from config.local.js (local dev).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outPath = path.join(root, 'config.js');

// Netlify: use env vars
if (process.env.ALCHEMY_API_KEY || process.env.WC_PROJECT_ID) {
  const alchemy = process.env.ALCHEMY_API_KEY || 'demo';
  const wc = process.env.WC_PROJECT_ID || '';
  const delegate = process.env.DELEGATE_API_KEY ? `window.DELEGATE_API_KEY = '${process.env.DELEGATE_API_KEY}';` : '';
  const js = `// Auto-generated at build time - do not commit
window.ALCHEMY_API_KEY = '${alchemy}';
window.WC_PROJECT_ID = '${wc}';
${delegate}
`;
  fs.writeFileSync(outPath, js);
  console.log('[build-config] Wrote config.js from environment variables');
  return;
}

// Local: copy from config.local.js if it exists
const localPath = path.join(root, 'config.local.js');
if (fs.existsSync(localPath)) {
  fs.copyFileSync(localPath, outPath);
  console.log('[build-config] Copied config.local.js to config.js');
  return;
}

// Fallback: create config.js with placeholders
const js = `// Copy config.example.js to config.js or config.local.js and add your keys
window.ALCHEMY_API_KEY = window.ALCHEMY_API_KEY || 'demo';
window.WC_PROJECT_ID = window.WC_PROJECT_ID || '';
`;
fs.writeFileSync(outPath, js);
console.log('[build-config] Created config.js with defaults');
