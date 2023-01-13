import {
  render,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
} from '@testing-library/react';
import React, {ReactElement} from 'react';
import {I18nextProvider} from 'react-i18next';

import {i18n} from '../providers/TokengateProvider';

const AppContext = ({children}: {children: React.ReactNode}) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
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
