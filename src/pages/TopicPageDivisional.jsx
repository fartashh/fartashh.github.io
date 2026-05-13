import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Building, Phone } from 'lucide-react';
import Header from '../components/Header';

// Use Vite's import.meta.glob to synchronously import all markdown files
const divisionsModules = import.meta.glob('../knowledgebases/divisions/*.md', { as: 'raw', eager: true });

export default function TopicPageDivisional() {
  const { topicId } = useParams();
  
  const divPath = `../knowledgebases/divisions/${topicId}.md`;
  let content = 'Content not found.';
  
  if (divisionsModules[divPath]) {
    content = divisionsModules[divPath];
  }

  return (
    <>
      <Header />
      <main className="topic-page container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Services
        </Link>
        
        <div className="kb-panel panel-divisions glass" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="panel-title" style={{ margin: 0 }}>
              <Building size={24} /> Division Information
            </h2>
            <Link to={`/311/kb/${topicId}`} className="back-link" style={{ margin: 0, color: 'var(--alert-color)' }}>
              <Phone size={20} /> View 311 Services
            </Link>
          </div>
          <div className="markdown-body">
            <ReactMarkdown>{content}</ReactMarkdown>
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
