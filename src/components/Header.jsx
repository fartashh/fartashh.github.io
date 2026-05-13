import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <Building2 size={32} color="var(--highlight-color)" />
          Torvana
        </Link>
        <nav className="nav-links">
          <Link to="/">Services</Link>
          <Link to="/311">311 Online</Link>
          <Link to="/divisions">Divisions</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
