export function ProjectCard({ project }) {
  if (!['live', 'coming-soon'].includes(project.status)) throw new Error(`Invalid project status: ${project.name}`);
  const live = project.status === 'live';
  if (live && !/^\/[a-z0-9/-]+$/.test(project.path)) throw new Error(`Invalid project path: ${project.name}`);
  const Element = live ? 'a' : 'article';
  return (
    <li>
      <Element className={`project ${live ? 'project-live' : 'project-upcoming'}`}
        href={live ? `https://life.au.edu${project.path}/` : undefined}
        target={live ? '_blank' : undefined} rel={live ? 'noopener noreferrer' : undefined}>
        <div className="project-top">
          {project.logo && <img className="project-logo" src={project.logo} width="42" height="42" alt="" decoding="async" />}
          <h3>{project.name}</h3>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-bottom">
          {live ? <>
            <span className="project-path">{project.path}</span>
            <span className="status status-live">Live</span>
            <img className="project-arrow" src="assets/arrow-up-right.svg" alt="" width="17" height="17" />
          </> : <span className="status">Coming soon</span>}
        </div>
      </Element>
    </li>
  );
}
