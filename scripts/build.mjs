import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { projects } from '../src/projects.mjs';
import { constructionScene } from '../src/scene.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function projectCard(project) {
  if (!['live', 'coming-soon'].includes(project.status)) throw new Error(`Invalid project status: ${project.name}`);
  const live = project.status === 'live';
  if (live && !/^\/[a-z0-9/-]+$/.test(project.path)) throw new Error(`Invalid project path: ${project.name}`);
  const tag = live ? 'a' : 'article';
  const link = live ? ` href="https://life.au.edu${escape(project.path)}/"` : '';
  return `<li><${tag} class="project ${live ? 'project-live' : 'project-upcoming'}"${link}>
    <div class="project-top">${project.logo ? `<img class="project-logo" src="${escape(project.logo)}" width="42" height="42" alt="" decoding="async">` : ''}<h3>${escape(project.name)}</h3></div>
    <p class="project-description">${escape(project.description)}</p>
    <div class="project-bottom">${live ? `<span class="project-path">${escape(project.path)}</span><span class="status status-live">Live</span><img class="project-arrow" src="assets/arrow-up-right.svg" alt="" width="17" height="17">` : '<span class="status">Coming soon</span>'}</div>
  </${tag}></li>`;
}

export async function build() {
  const output = path.join(root, 'dist');
  await mkdir(output, { recursive: true });
  const template = await readFile(path.join(root, 'src/index.html'), 'utf8');
  const html = template.replace('<!-- CONSTRUCTION_SCENE -->', constructionScene()).replace('<!-- PROJECTS -->', projects.map(projectCard).join('\n'));
  await writeFile(path.join(output, 'index.html'), html);
  await cp(path.join(root, 'public/assets'), path.join(output, 'assets'), { recursive: true });
  for (const name of ['styles.css', 'motion.js']) await cp(path.join(root, 'src', name), path.join(output, name));
  console.log(`Built ${projects.length} projects into dist/`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
