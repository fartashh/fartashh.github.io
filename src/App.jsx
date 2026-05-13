import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TopicPageDivisional from './pages/TopicPageDivisional';
import TopicPage311 from './pages/TopicPage311';
import Page311List from './pages/Page311List';
import PageDivisionsList from './pages/PageDivisionsList';
import PageContact from './pages/PageContact';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/311" element={<Page311List />} />
      <Route path="/divisions" element={<PageDivisionsList />} />
      <Route path="/contact" element={<PageContact />} />
      <Route path="/:topicId" element={<TopicPageDivisional />} />
      <Route path="/311/kb/:topicId" element={<TopicPage311 />} />
    </Routes>
  );
}

export default App;
