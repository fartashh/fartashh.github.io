import { useNavigate, Link } from 'react-router-dom';
import { Trash2, AlertTriangle, Bug, VolumeX, TreePine, Droplets, Snowflake, ArrowLeft, Phone } from 'lucide-react';
import Header from '../components/Header';

const topics = [
  { id: 'garbage', title: 'Garbage & Solid Waste Issues', icon: Trash2 },
  { id: 'potholes', title: 'Potholes & Road Maintenance', icon: AlertTriangle },
  { id: 'wildlife', title: 'Wildlife Requests', icon: Bug },
  { id: 'property', title: 'Property Standards & Noise', icon: VolumeX },
  { id: 'tree', title: 'Tree Maintenance', icon: TreePine },
  { id: 'water', title: 'Water, Sewer & Drainage', icon: Droplets },
  { id: 'snow', title: 'Snow & Sidewalk Complaints', icon: Snowflake },
];

export default function Page311List() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Phone size={48} color="var(--alert-color)" style={{ marginBottom: '10px' }} />
          <h1 className="section-title">311 Online Services</h1>
          <p style={{ color: '#ccc', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Submit a service request online or browse our 311 knowledge base. The 311 service handles direct citizen complaints and alternative timelines.
          </p>
        </div>
        
        <div className="grid">
          {topics.map((topic) => {
            const IconComponent = topic.icon;
            return (
            <Link 
              key={topic.id} 
              to={`/311/kb/${topic.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="topic-card glass panel-311">
                <div className="icon-wrapper">
                  <IconComponent size={32} />
                </div>
                <h3>{topic.title}</h3>
              </div>
            </Link>
            );
          })}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} City of Torvana. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
