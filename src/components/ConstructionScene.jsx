import { constructionScene } from '../scene.mjs';

// Trusted, deterministic artwork stays identical during prerender and hydration.
const sceneMarkup = { __html: constructionScene() };

export function ConstructionScene() {
  return <div className="scene-frame" dangerouslySetInnerHTML={sceneMarkup} />;
}
