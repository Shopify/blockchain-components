import {render, RenderOptions} from '@testing-library/react';
import {ReactElement} from 'react';

import {RootProvider} from '../providers/RootProvider';

export const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: RootProvider, ...options});
