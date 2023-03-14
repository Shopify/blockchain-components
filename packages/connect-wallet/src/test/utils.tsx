import {
  render,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
} from '@testing-library/react';
import {ReactElement} from 'react';

import {PackageContext, PackageContextProps} from './PackageContext';

const renderWithContext = (
  ui: ReactElement,
  contextProps: PackageContextProps,
  options?: Omit<RenderOptions, 'wrapper'>,
) =>
  render(ui, {
    wrapper: (props) => <PackageContext {...props} {...contextProps} />,
    ...options,
  });

function renderHookWithContext<TResult, TProps>(
  render: (props: TProps) => TResult,
  contextProps: PackageContextProps,
  options?: RenderHookOptions<TProps>,
): RenderHookResult<TResult, TProps> {
  return renderHook(render, {
    wrapper: (props) => <PackageContext {...props} {...contextProps} />,
    ...options,
  });
}

export * from '@testing-library/react';
export {renderWithContext as render, renderHookWithContext};
