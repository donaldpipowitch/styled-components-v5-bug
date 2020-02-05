import React from 'react';
import { useInitialCleanup } from './hooks/use-initial-cleanup';
import { Text } from './components/text';

export const App = () => {
  useInitialCleanup();
  return (
    <Text>If you see this, everything is working.</Text>
  );
};
