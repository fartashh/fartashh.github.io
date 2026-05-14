import { writeFileSync } from 'fs';

const BASE_URL = process.env.SITE_URL || 'https://fartashh.github.io';

const services = ['garbage', 'potholes', 'wildlife', 'property', 'tree', 'water', 'snow'];

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/311/', priority: '0.9', changefreq: 'weekly' },
  { path: '/divisions/', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact/', priority: '0.9', changefreq: 'monthly' },
  ...services.map(s => ({ path: `/311/kb/${s}`, priority: '0.8', changefreq: 'weekly' })),
  ...services.map(s => ({ path: `/divisions/kb/${s}`, priority: '0.8', changefreq: 'weekly' })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync('sitemap.xml', sitemap);
console.log('✅ sitemap.xml generated with', pages.length, 'URLs');