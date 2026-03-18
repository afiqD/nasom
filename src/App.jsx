import { Routes, Route, Link } from 'react-router-dom';

// 1. Imports
import Usability from './nasom-usability-viz';     // Website review
import Competitor from './nasom-competitor-viz';   // Competitor research
import Personas from './nasom-personas-viz';       // User personas
import Sitemap from './nasom-sitemap-viz';         // IA + Navigation (Part 1)
import Nav from './nasom-nav-viz';                 // IA + Navigation (Part 2)
import Userflow from './nasom-userflow-viz';       // User journey flows
import Wireframes from './nasom-wireframes-viz';   // Wireframes
import Components from './nasom-components-viz';   // UI components
import CMS from './nasom-cms-viz';                 // Dev handoff (Part 1)
import DevHandoff from './nasom-devhandoff-viz';   // Dev handoff (Part 2)

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SIDEBAR NAVIGATION - Sorted by Task List */}
      <nav style={{ width: '280px', padding: '2rem', borderRight: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <h2 style={{ fontSize: '1rem', color: '#888', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Designer Tasks</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><Link to="/usability" style={linkStyle}>Website Review</Link></li>
          <li><Link to="/competitor" style={linkStyle}>Competitor Research</Link></li>
          <li><Link to="/personas" style={linkStyle}>User Personas</Link></li>
          <li><Link to="/sitemap" style={linkStyle}>IA + Navigation</Link></li>
          <li><Link to="/nav" style={linkStyle}>Navigation</Link></li>
          <li><Link to="/userflow" style={linkStyle}>User Journey Flows</Link></li>
          <li><Link to="/wireframes" style={linkStyle}>Wireframes</Link></li>
          <li><Link to="/components" style={linkStyle}>UI Components</Link></li>
          <li><Link to="/cms" style={linkStyle}>CMS</Link></li>
          <li><Link to="/handoff" style={linkStyle}>Dev Handoff</Link></li>
        </ul>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#fff' }}>
        <Routes>
          {/* Default/Home page - redirected to Usability for now */}
          <Route path="/" element={<Usability />} /> 
          
          <Route path="/usability" element={<Usability />} />
          <Route path="/competitor" element={<Competitor />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/nav" element={<Nav />} />
          <Route path="/userflow" element={<Userflow />} />
          <Route path="/wireframes" element={<Wireframes />} />
          <Route path="/components" element={<Components />} />
          <Route path="/cms" element={<CMS />} />
          <Route path="/handoff" element={<DevHandoff />} /> 
        </Routes>
      </main>
    </div>
  );
}

// Simple helper style for links
const linkStyle = { 
  color: '#ccc', 
  textDecoration: 'none', 
  fontSize: '0.95rem' 
};

export default App;