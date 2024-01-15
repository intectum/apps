import { FormEvent, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import Freelance from './pages/Freelance';
import Hardware from './pages/Hardware';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Software from './pages/Software';

function App()
{
  const navigate = useNavigate();
  const [ query, setQuery ] = useState<string>();

  const submit = (event: FormEvent) =>
  {
    event.preventDefault();

    if (query)
    {
      navigate(`/projects?q=${query}`);
    }
  };

  return (
    <>
      <header className="u-p">
        <nav>
          <Link to="/" className="u-text-large u-m--sm">intectum</Link>
          <Link to="/freelance" className="u-color--light u-m--sm">freelance</Link>
          <Link to="/projects" className="u-color--light u-m--sm">projects</Link>
        </nav>
        <form onSubmit={submit} className="u-medium">
          <input
            type="text"
            className="u-mr"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <button
            type="submit"
            className="c-button c-button--small c-button--primary"
          >
            Search
          </button>
        </form>
      </header>
      <img src="/images/logo.png" alt="intectum" className="c-background" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/freelance" element={<Freelance />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/software" element={<Software />} />
      </Routes>
    </>
  );
}

export default App;
