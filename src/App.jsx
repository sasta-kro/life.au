import { projects } from './projects.mjs';
import { ConstructionScene } from './components/ConstructionScene.jsx';
import { MotionControl } from './components/MotionControl.jsx';
import { ProjectCard } from './components/ProjectCard.jsx';

export function App() {
  return <>
    <a className="skip-link" href="#projects">Skip to projects</a>
    <main>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy container">
          <p className="eyebrow">Assumption University</p>
          <h1 id="page-title">Under construction<span className="full-stop">.</span></h1>
          <p className="intro">This space is taking shape.<br className="mobile-break" /> A few projects are already live.</p>
        </div>
        <ConstructionScene />
        <div className="scene-caption container">
          <span className="site-address">life.au.edu</span>
          <MotionControl />
        </div>
      </section>
      <section className="projects container" id="projects" aria-labelledby="projects-title" tabIndex={-1}>
        <div className="section-heading"><h2 id="projects-title">Projects</h2><p>Open now. More on the way.</p></div>
        <ul className="project-grid">{projects.map(project => <ProjectCard key={project.path ?? project.name} project={project} />)}</ul>
      </section>
    </main>
    <footer className="footer container">
      <span>Assumption University</span>
      <span>Developed by <span className="developer">Sai Aike Shwe Tun Aung</span></span>
    </footer>
  </>;
}
