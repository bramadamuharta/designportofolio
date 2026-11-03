import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { App } from './App';
import { mdxComponents } from './components/mdx';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('#root is missing from index.html');

createRoot(container).render(
  <StrictMode>
    {/* BASE_URL keeps routing correct when the site is served from /<repo>/ on
        GitHub Pages rather than from the domain root. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MDXProvider components={mdxComponents}>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </StrictMode>,
);
