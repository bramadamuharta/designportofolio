import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { App } from './App';
import { mdxComponents } from './components/mdx';
import { I18nProvider } from './lib/i18n';
import { ThemeProvider } from './lib/theme';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('#root is missing from index.html');

const base = import.meta.env.BASE_URL;
const basename = base.startsWith('/') ? base : window.location.pathname.replace(/[^/]*$/, '');

createRoot(container).render(
  <StrictMode>
    {/* Keeps routing correct wherever the site is mounted: an absolute base
        (GitHub Pages serves from /<repo>/) is used as given, while a relative
        base is resolved to the directory the page is actually served from. */}
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <I18nProvider>
          <MDXProvider components={mdxComponents}>
            <App />
          </MDXProvider>
        </I18nProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
