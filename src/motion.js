const toggle = document.querySelector('.motion-toggle');
const label = toggle.querySelector('[data-motion-label]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = false;

function synchronizeMotion() {
  const stopped = paused || document.hidden || reducedMotion.matches;
  document.documentElement.style.setProperty('--motion-state', stopped ? 'paused' : 'running');
  toggle.hidden = reducedMotion.matches;
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.setAttribute('aria-label', paused ? 'Resume construction animation' : 'Pause construction animation');
  label.textContent = paused ? 'Resume animation' : 'Pause animation';
}

toggle.addEventListener('click', () => {
  paused = !paused;
  synchronizeMotion();
});
reducedMotion.addEventListener('change', synchronizeMotion);
document.addEventListener('visibilitychange', synchronizeMotion);
synchronizeMotion();
