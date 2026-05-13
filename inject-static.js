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
    <li><a href="/311/kb/garbage">Garbage &amp; Solid Waste</a></li>
    <li><a href="/311/kb/potholes">Potholes &amp; Road Maintenance</a></li>
    <li><a href="/311/kb/wildlife">Wildlife Requests</a></li>
    <li><a href="/311/kb/property">Property Standards &amp; Noise</a></li>
    <li><a href="/311/kb/tree">Tree Maintenance</a></li>
    <li><a href="/311/kb/water">Water, Sewer &amp; Drainage</a></li>
    <li><a href="/311/kb/snow">Snow &amp; Sidewalk Complaints</a></li>
  </ul>
</main>`;

const result = html
  .replace('<!--app-html-->', content)
  .replace(/<div id="root">(\s*)<\/div>/, `<div id="root">${content}</div>`)
  .replace(/<div id="root"\/>/, `<div id="root">${content}</div>`);

writeFileSync('dist/index.html', result);
console.log('✅ Static HTML injected');
