import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>How can we help you today?</h1>
        <p>Access municipal services, report issues, and find information about the City of Torvana.</p>
        
        <div className="search-bar">
          <input type="text" placeholder="Search services, information, or topics..." />
          <button type="button">
            <Search size={20} style={{ verticalAlign: 'middle' }} />
          </button>
        </div>
      </div>
    </section>
  );
}
