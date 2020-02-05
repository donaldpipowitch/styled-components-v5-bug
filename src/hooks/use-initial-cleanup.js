import { useEffect } from 'react';

export function useInitialCleanup() {
  useEffect(() => {
    const initial = document.getElementById('initial');
    if (initial) {
      initial.remove();
    }
  }, []);
}
