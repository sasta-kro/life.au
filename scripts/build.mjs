import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { build } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
await build({ root });

// Keep the build-only React renderer outside the deployable static directory.
const rendererDirectory = await mkdtemp(path.join(root, 'node_modules/.prerender-'));
try {
  await build({
    root,
    publicDir: false,
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: rendererDirectory,
      emptyOutDir: true,
      rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
    },
  });
  const { render } = await import(pathToFileURL(path.join(rendererDirectory, 'entry-server.mjs')));
  const htmlPath = path.join(root, 'dist/index.html');
  const template = await readFile(htmlPath, 'utf8');
  if (!template.includes('<!--app-html-->')) throw new Error('Prerender slot missing from built HTML');
  await writeFile(htmlPath, template.replace('<!--app-html-->', () => render()));
  console.log('Prerendered React page into dist/index.html');
} finally {
  await rm(rendererDirectory, { recursive: true, force: true });
}
