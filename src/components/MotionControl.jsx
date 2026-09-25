import { useEffect, useState } from 'react';

export function MotionControl() {
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rootStyle = document.documentElement.style;
    const previousState = rootStyle.getPropertyValue('--motion-state');
    function synchronizeMotion() {
      rootStyle.setProperty('--motion-state', paused || document.hidden || reducedMotion.matches ? 'paused' : 'running');
      setAvailable(!reducedMotion.matches);
    }
    reducedMotion.addEventListener('change', synchronizeMotion);
    document.addEventListener('visibilitychange', synchronizeMotion);
    synchronizeMotion();
    return () => {
      reducedMotion.removeEventListener('change', synchronizeMotion);
      document.removeEventListener('visibilitychange', synchronizeMotion);
      if (previousState) rootStyle.setProperty('--motion-state', previousState);
      else rootStyle.removeProperty('--motion-state');
    };
  }, [paused]);

  return (
    <button className="motion-toggle" type="button" aria-pressed={paused}
      aria-label={paused ? 'Resume construction animation' : 'Pause construction animation'}
      hidden={!available} onClick={() => setPaused(value => !value)}>
      <span className="motion-indicator" aria-hidden="true" />
      <span data-motion-label>{paused ? 'Resume animation' : 'Pause animation'}</span>
    </button>
  );
}
