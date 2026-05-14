import Header from '../components/Header';
import Hero from '../components/Hero';
import TopicGrid from '../components/TopicGrid';

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <TopicGrid />
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 City of Torvana. All rights reserved.</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </p>
        </div>
      </footer>
    </>
  );
}
