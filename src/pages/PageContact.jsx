import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

export default function PageContact() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Mail size={48} color="var(--highlight-color)" style={{ marginBottom: '10px' }} />
          <h1 className="section-title">Contact Torvana</h1>
          <p style={{ color: '#ccc', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Get in touch with the City of Torvana. For service requests, please use our 311 portal.
          </p>
        </div>
        
        <div className="grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="topic-card glass">
            <div className="icon-wrapper">
              <Phone size={32} />
            </div>
            <h3>311 Service Directory</h3>
            <p style={{ color: '#ccc', marginTop: '10px' }}>Call 311 from within city limits for 24/7 assistance.</p>
          </div>
          
          <div className="topic-card glass">
            <div className="icon-wrapper">
              <MapPin size={32} />
            </div>
            <h3>City Hall</h3>
            <p style={{ color: '#ccc', marginTop: '10px' }}>100 Queen Street West<br/>Torvana, ON M5H 2N2</p>
          </div>
          
          <div className="topic-card glass">
            <div className="icon-wrapper">
              <Mail size={32} />
            </div>
            <h3>General Inquiries</h3>
            <p style={{ color: '#ccc', marginTop: '10px' }}>info@torvana.ca</p>
          </div>
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
