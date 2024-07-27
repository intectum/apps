import { Link, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Projects from './pages/Projects';

const App = () =>
  <>
    <header className="u-p">
      <nav>
        <Link to="/" className="u-text-large u-m--sm">intectum</Link>
        <Link to="/projects" className="u-color--light u-m--sm">projects</Link>
      </nav>
    </header>
    <img src="/images/logo.png" alt="intectum" className="c-background" />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  </>;

export default App;
