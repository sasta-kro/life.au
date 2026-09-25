import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), {
    name: 'prerender-dev-page',
    transformIndexHtml: {
      order: 'pre',
      async handler(html, context) {
        if (!context.server) return html;
        const { render } = await context.server.ssrLoadModule('/src/entry-server.jsx');
        return html.replace('<!--app-html-->', () => render());
      },
    },
  }],
  server: { host: '127.0.0.1', port: 4174, strictPort: true },
  preview: { host: '127.0.0.1', port: 4174, strictPort: true },
});
