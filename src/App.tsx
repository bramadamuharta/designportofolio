import { Route, Routes } from 'react-router-dom';
import { CaseStudy } from './routes/CaseStudy';
import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/case/:slug" element={<CaseStudy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
