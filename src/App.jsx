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
          <img className="faculty-logo" src="assets/logos/vmes-logo.png" width="225" height="225"
            alt="Vincent Mary School of Engineering, Science and Technology" decoding="async" />
          <p className="eyebrow">Assumption University</p>
          <div className="hero-heading">
            <h1 id="page-title">Life<span className="full-stop">.</span>AU</h1>
            <p className="construction-status">Under construction</p>
          </div>
          <p className="intro">A few projects are already live.</p>
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
      <span>Developed by <a className="developer" href="https://github.com/sasta-kro" target="_blank" rel="noopener noreferrer">Sai Aike Shwe Tun Aung</a></span>
    </footer>
  </>;
}
