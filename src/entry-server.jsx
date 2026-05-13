import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

// base is the repo subpath e.g. '/'
const BASE = '/';

export function render(url) {
  // url is the route path only, e.g. '/', '/garbage', '/311/kb/garbage'
  // StaticRouter with basename needs the full path including the base
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter basename={BASE} location={BASE + (url === '/' ? '' : url)}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}
