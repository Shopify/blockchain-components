import {
  render,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
} from '@testing-library/react';
import React, {ReactElement} from 'react';

import {I18nProvider} from '../providers/I18nProvider';

const AppContext = ({children}: {children: React.ReactNode}) => {
  return <I18nProvider>{children}</I18nProvider>;
};

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AppContext, ...options});

function renderHookWithContext<TResult, TProps>(
  render: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>,
): RenderHookResult<TResult, TProps> {
  return renderHook(render, {wrapper: AppContext, ...options});
}

export * from '@testing-library/react';
export {renderWithContext as render, renderHookWithContext as renderHook};
