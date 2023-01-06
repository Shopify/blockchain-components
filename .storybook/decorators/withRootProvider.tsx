import React from 'react';
import {RootProvider} from '../../packages/shared/src/providers/RootProvider';

export const withRootProvider = (Story) => {
  return (
    <RootProvider>
      <Story />
    </RootProvider>
  );
};
