import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Building, Phone } from 'lucide-react';
import Header from '../components/Header';

// Use Vite's import.meta.glob to synchronously import all markdown files
const t311Modules = import.meta.glob('../knowledgebases/311/*.md', { as: 'raw', eager: true });

export default function TopicPage311() {
  const { topicId } = useParams();
  
  const t311Path = `../knowledgebases/311/${topicId}.md`;
  let content = 'Content not found.';
  
  if (t311Modules[t311Path]) {
    content = t311Modules[t311Path];
  }

  return (
    <>
      <Header />
      <main className="topic-page container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Services
        </Link>
        
        <div className="kb-panel panel-311 glass" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="panel-title" style={{ margin: 0 }}>
              <Phone size={24} /> 311 Services
            </h2>
            <Link to={`/${topicId}`} className="back-link" style={{ margin: 0, color: 'var(--success-color)' }}>
              <Building size={20} /> View Division Info
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
