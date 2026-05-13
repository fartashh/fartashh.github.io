import { Link } from 'react-router-dom';
import { Trash2, AlertTriangle, Bug, VolumeX, TreePine, Droplets, Snowflake } from 'lucide-react';

const topics = [
  { id: 'garbage', title: 'Garbage & Solid Waste Issues', icon: Trash2 },
  { id: 'potholes', title: 'Potholes & Road Maintenance', icon: AlertTriangle },
  { id: 'wildlife', title: 'Wildlife Requests', icon: Bug },
  { id: 'property', title: 'Property Standards & Noise', icon: VolumeX },
  { id: 'tree', title: 'Tree Maintenance', icon: TreePine },
  { id: 'water', title: 'Water, Sewer & Drainage', icon: Droplets },
  { id: 'snow', title: 'Snow & Sidewalk Complaints', icon: Snowflake },
];

export default function TopicGrid() {


  return (
    <section className="topics-section container">
      <h2 className="section-title">Popular Services</h2>
      <div className="grid">
        {topics.map((topic) => {
          const IconComponent = topic.icon;
          return (
            <Link
              key={topic.id}
              to={`/311/kb/${topic.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="topic-card glass">
                <div className="icon-wrapper">
                  <IconComponent size={32} />
                </div>
                <h3>{topic.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
