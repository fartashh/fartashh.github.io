import { readFileSync, writeFileSync } from 'fs';
const html = readFileSync('dist/index.html', 'utf-8');

console.log('=== dist/index.html contents ===');
console.log(html);
console.log('=== end ===');

const content = `<nav>
  <a href="/">Torvana</a>
  <a href="/311">311 Online</a>
  <a href="/divisions">Divisions</a>
  <a href="/contact">Contact</a>
</nav>
<main>
  <h1>How can we help you today?</h1>
  <p>Access municipal services and report issues in the City of Torvana.</p>
  <ul>
    <li>Garbage &amp; Solid Waste Issues</li>
    <li>Potholes &amp; Road Maintenance</li>
    <li>Wildlife Requests</li>
    <li>Property Standards &amp; Noise</li>
    <li>Tree Maintenance</li>
    <li>Water, Sewer &amp; Drainage</li>
    <li>Snow &amp; Sidewalk Complaints</li>
  </ul>
</main>`;

const result = html
  .replace('<!--app-html-->', content)
  .replace(/<div id="root">(\s*)<\/div>/, `<div id="root">${content}</div>`)
  .replace(/<div id="root"\/>/, `<div id="root">${content}</div>`);

writeFileSync('dist/index.html', result);
console.log('✅ Static HTML injected');
