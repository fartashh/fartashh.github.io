import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';

// ... (services and template omitted for brevity, I will re-write the loop)

const services = {
  garbage: {
    title: 'Garbage &amp; Solid Waste',
    description: 'City Division information for Garbage &amp; Solid Waste — Torvana City Portal',
    content: `<h2>Garbage &amp; Solid Waste — Division Information</h2>
<h3>Responsible Division</h3>
<p><strong>Solid Waste Management Services</strong> — City of Torvana</p>
<h3>Service Overview</h3>
<p>The City provides residential garbage, recycling (Blue Bin), and organics (Green Bin) collection. Responsibility for blue bin recycling collection has shifted to producer responsibility organizations (such as Circular Materials).</p>
<h3>Service Level Agreement (SLA)</h3>
<ul>
  <li>Missed collections should be reported <strong>within 1 business day</strong> of the scheduled collection.</li>
  <li>The City investigates missed pickup reports and arranges supplemental collection.</li>
</ul>
<h3>Responsibility Matrix</h3>
<table>
  <thead><tr><th>Task</th><th>City</th><th>Resident</th></tr></thead>
  <tbody>
    <tr><td>Curbside garbage collection</td><td>✅</td><td></td></tr>
    <tr><td>Blue Bin recycling (municipal areas)</td><td>✅</td><td></td></tr>
    <tr><td>Green Bin organics collection</td><td>✅</td><td></td></tr>
    <tr><td>Placing bins at curb by collection time</td><td></td><td>✅</td></tr>
    <tr><td>Bin maintenance / cleanliness</td><td></td><td>✅</td></tr>
  </tbody>
</table>
<h3>Escalation Contact</h3>
<p>If not satisfied with a service request outcome, call <strong>311</strong> (or <strong>416-392-2489</strong> outside city limits) to escalate to the General Manager's Office using your service request number.</p>`
  },
  potholes: {
    title: 'Potholes &amp; Road Maintenance',
    description: 'City Division information for Potholes &amp; Road Maintenance — Torvana City Portal',
    content: `<h2>Potholes &amp; Road Maintenance — Division Information</h2>
<h3>Responsible Division</h3>
<p><strong>Transportation Services</strong> — City of Torvana</p>
<h3>Service Overview</h3>
<p>Transportation Services manages road maintenance. Potholes are identified through regular patrols and public reports. Temporary patches use cold-mix asphalt; permanent repairs use hot asphalt when weather permits.</p>
<h3>Service Level Agreement (SLA)</h3>
<ul>
  <li>Repairs are prioritized based on road type, traffic volume, and safety risk.</li>
  <li>No guaranteed public SLA time for individual pothole repairs.</li>
  <li>Vehicle damage claims must be submitted <strong>within 10 days</strong> of the incident.</li>
</ul>
<h3>Responsibility Matrix</h3>
<table>
  <thead><tr><th>Task</th><th>City</th><th>Resident</th></tr></thead>
  <tbody>
    <tr><td>Pothole patching on public roads</td><td>✅</td><td></td></tr>
    <tr><td>Road resurfacing (major works)</td><td>✅</td><td></td></tr>
    <tr><td>Private driveway / parking lot repairs</td><td></td><td>✅</td></tr>
    <tr><td>Vehicle damage claim submission</td><td></td><td>✅</td></tr>
  </tbody>
</table>
<h3>Escalation Contact</h3>
<p>Call <strong>311</strong> (or <strong>416-392-2489</strong> outside city limits). For vehicle damage claims, contact the Claims Inquiry Line at <strong>416-397-4212</strong>.</p>`
  },
  wildlife: {
    title: 'Wildlife Requests',
    description: 'City Division information for Wildlife Requests — Torvana City Portal',
    content: `<h2>Wildlife Requests — Division Information</h2>
<h3>Responsible Division</h3>
<p><strong>Parks, Forestry and Recreation</strong> — City of Torvana</p>
<h3>Service Overview</h3>
<p>Parks, Forestry and Recreation provides guidelines on urban wildlife. For sick, injured, or distressed animals, City staff respond based on urgency and public safety.</p>
<h3>Service Level Agreement (SLA)</h3>
<ul>
  <li>No specific public SLA response times are published for wildlife calls.</li>
  <li>Raccoons are Rabies Vector Species (RVS) — do <strong>not</strong> approach them.</li>
  <li>Emergency situations (e.g., aggressive animal) receive priority response.</li>
</ul>
<h3>Responsibility Matrix</h3>
<table>
  <thead><tr><th>Task</th><th>City</th><th>Resident</th></tr></thead>
  <tbody>
    <tr><td>Responding to sick/injured wildlife</td><td>✅</td><td></td></tr>
    <tr><td>Wildlife on public property</td><td>✅</td><td></td></tr>
    <tr><td>Wildlife on private property (nuisance)</td><td></td><td>✅</td></tr>
    <tr><td>Securing garbage to deter wildlife</td><td></td><td>✅</td></tr>
  </tbody>
</table>
<h3>Escalation Contact</h3>
<p>Call <strong>311</strong> for City wildlife services. For additional guidance, contact the <strong>Toronto Wildlife Centre</strong>.</p>`
  },
  property: {
    title: 'Property Standards &amp; Noise',
    description: 'City Division information for Property Standards &amp; Noise — Torvana City Portal',
    content: `<h2>Property Standards &amp; Noise — Division Information</h2>
<h3>Responsible Division</h3>
<p><strong>Municipal Licensing &amp; Standards (MLS)</strong> — City of Torvana</p>
<h3>Service Overview</h3>
<p>MLS handles zoning, building permits, and noise complaints. Note: bylaw officers do <strong>not</strong> respond to noisy parties or disorderly conduct — those are police matters.</p>
<h3>Service Level Agreement (SLA)</h3>
<ul>
  <li><strong>Acknowledgment:</strong> Within <strong>2 business days</strong>.</li>
  <li><strong>Response/Resolution:</strong> Target within <strong>10 business days</strong>.</li>
  <li>Urgent vital services (heat/water in rentals): Landlords must respond within <strong>24 hours</strong>.</li>
</ul>
<h3>Responsibility Matrix</h3>
<table>
  <thead><tr><th>Task</th><th>City / MLS</th><th>Property Owner</th></tr></thead>
  <tbody>
    <tr><td>Noise bylaw enforcement</td><td>✅</td><td></td></tr>
    <tr><td>Property standards inspection</td><td>✅</td><td></td></tr>
    <tr><td>Maintaining property to code</td><td></td><td>✅</td></tr>
    <tr><td>Noisy parties / disorderly conduct</td><td>Police (416-808-2222)</td><td></td></tr>
  </tbody>
</table>
<h3>Escalation Contact</h3>
<p>Bylaw/Noise: <strong>311</strong>. Noisy parties or disorderly conduct: Toronto Police non-emergency at <strong>416-808-2222</strong>.</p>`
  },
  tree: {
    title: 'Tree Maintenance',
    description: 'City Division information for Tree Maintenance — Torvana City Portal',
    content: `<h2>Tree Maintenance — Division Information</h2>
<h3>Responsible Division</h3>
<p><strong>Urban Forestry</strong> — City of Torvana</p>
<h3>Service Overview</h3>
<p>Urban Forestry manages the City's street tree maintenance program with a goal of a <strong>7-year rotation</strong> for all City street trees.</p>
<h3>Service Level Agreement (SLA)</h3>
<ul>
  <li>Delivery timelines may be delayed due to high work volumes.</li>
  <li>If a tree was pruned within the last <strong>7 years</strong>, new non-emergency pruning requests are generally rejected.</li>
  <li>Expedited non-emergency pruning requires hiring a licensed private arborist at the resident's expense (permit required).</li>
</ul>
<h3>Responsibility Matrix</h3>
<table>
  <thead><tr><th>Task</th><th>City</th><th>Resident</th></tr></thead>
  <tbody>
    <tr><td>City street tree pruning</td><td>✅</td><td></td></tr>
    <tr><td>Emergency hazard tree removal (street trees)</td><td>✅</td><td></td></tr>
    <tr><td>Trees on private property</td><td></td><td>✅</td></tr>
    <tr><td>Expedited non-emergency pruning</td><td></td><td>✅ (private arborist)</td></tr>
  </tbody>
</table>
<h3>Escalation Contact</h3>
<p>Call <strong>311</strong> for all tree-related requests. Emergency tree hazards receive priority response.</p>`
  },
  water: {
    title: 'Water, Sewer &amp; Drainage',
    description: 'City Division information for Water, Sewer &amp; Drainage — Torvana City Portal',
    content: `<h2>Water, Sewer &amp; Drainage — Division Information</h2>
<h3>Responsible Division</h3>
<p><strong>Toronto Water</strong> — City of Torvana</p>
<h3>Service Overview</h3>
<p>Toronto Water prioritizes emergency situations like active basement flooding or watermain breaks. The City maintains sewer connections from the main sewer to the property line; homeowners are responsible from the property line into the house.</p>
<h3>Service Level Agreement (SLA)</h3>
<ul>
  <li>Emergency flooding and watermain breaks receive immediate priority response.</li>
  <li>Non-emergency requests are scheduled based on work volume.</li>
</ul>
<h3>Responsibility Matrix</h3>
<table>
  <thead><tr><th>Task</th><th>City</th><th>Resident</th></tr></thead>
  <tbody>
    <tr><td>Watermain repair (street)</td><td>✅</td><td></td></tr>
    <tr><td>Sewer main (street to property line)</td><td>✅</td><td></td></tr>
    <tr><td>Sewer service (property line into house)</td><td></td><td>✅</td></tr>
    <tr><td>Basement flooding protection subsidy</td><td>✅ (subsidy program)</td><td></td></tr>
    <tr><td>River/creek flooding</td><td>TRCA (416-661-6514)</td><td></td></tr>
  </tbody>
</table>
<h3>Escalation Contact</h3>
<p>Sewer backup/flooding: <strong>311</strong>. River flooding: TRCA floodline at <strong>416-661-6514</strong>. Claims: <strong>416-397-4212</strong>.</p>`
  },
  snow: {
    title: 'Snow &amp; Sidewalk Complaints',
    description: 'City Division information for Snow &amp; Sidewalk Complaints — Torvana City Portal',
    content: `<h2>Snow &amp; Sidewalk Complaints — Division Information</h2>
<h3>Responsible Division</h3>
<p><strong>Transportation Services</strong> — City of Torvana</p>
<h3>Service Overview</h3>
<p>Transportation Services begins clearing public sidewalks once snow accumulation reaches <strong>2 cm</strong>. A full round of sidewalk plowing typically takes approximately <strong>12 hours</strong> to complete after snowfall ends.</p>
<h3>Service Level Agreement (SLA)</h3>
<ul>
  <li>Sidewalk clearing begins at <strong>2 cm</strong> accumulation threshold.</li>
  <li>Full sidewalk plowing cycle: approximately <strong>12 hours</strong> after snowfall ends.</li>
  <li>In areas without mechanical clearing, property owners must clear within <strong>12 hours</strong> of snowfall end.</li>
</ul>
<h3>Responsibility Matrix</h3>
<table>
  <thead><tr><th>Task</th><th>City</th><th>Property Owner</th></tr></thead>
  <tbody>
    <tr><td>Mechanical sidewalk plowing (City routes)</td><td>✅</td><td></td></tr>
    <tr><td>Road salting and plowing</td><td>✅</td><td></td></tr>
    <tr><td>Sidewalk clearing (non-mechanical areas)</td><td></td><td>✅ (within 12 hrs)</td></tr>
    <tr><td>Private driveway / walkway clearing</td><td></td><td>✅</td></tr>
  </tbody>
</table>
<h3>Escalation Contact</h3>
<p>Call <strong>311</strong> for all snow and sidewalk complaints. Provide your address and nearest intersection for fastest response.</p>`
  }
};

const template = (service, data) => `<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${data.description}" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/index.css">
    <title>${data.title} — City Divisions — Torvana City Portal</title>
</head>

<body>
    <header class="header">
        <div class="container header-content">
            <a class="logo" href="/">&#x1F3E2; Torvana</a>
            <nav class="nav-links">
                <a href="/">Services</a>
                <a href="/311/">311 Online</a>
                <a href="/divisions/">Divisions</a>
                <a href="/contact/">Contact</a>
            </nav>
        </div>
    </header>
    <main class="container topic-page">
        <a href="/divisions/" class="back-link">&#x2190; Back to Divisions</a>
        <div class="topic-header">
            <h1>${data.title}</h1>
        </div>
        <div class="kb-panel panel-divisions glass">
            <h2 class="panel-title">&#x1F3E2; Division Information</h2>
            <div class="markdown-body" id="divisions-content">
                ${data.content}
            </div>
        </div>
    </main>
    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 City of Torvana. All rights reserved.</p>
        </div>
    </footer>
    <div id="root" style="display:none"></div>
    <script type="module" src="/assets/app.js"></script>
</body>

</html>`;

for (const [service, data] of Object.entries(services)) {
  const dirPath = path.join('dist', 'divisions', 'kb', service);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, 'index.html');
  writeFileSync(filePath, template(service, data));
  console.log(`✅ Written: ${filePath}`);
}

console.log('✅ All divisions KB pages injected with static content in dist/');
