import { useEffect } from 'react';

export function useInitialCleanup() {
  useEffect(() => {
    const initial = document.getElementById('initial');
    if (initial) {
      const onTransitionend = () => {
        initial.remove();
        initial.removeEventListener('transitionend', onTransitionend);
      };
      initial.addEventListener('transitionend', onTransitionend);

      initial.style.transitionProperty = 'opacity';
      initial.style.transitionDelay = '0.1s';
      initial.style.transitionDuration = '0.3s';
      initial.style.opacity = '0.0';
    }
  }, []);
}
