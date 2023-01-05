import {
  render,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
} from '@testing-library/react';
import React, {ReactElement} from 'react';
import {I18nContext, I18nManager} from '@shopify/react-i18n';

const DEFAULT_LOCALE = 'en';

const mockI18nProviderContext = new I18nManager({locale: DEFAULT_LOCALE});

const AppContext = ({children}: {children: React.ReactNode}) => {
  return (
    <I18nContext.Provider value={mockI18nProviderContext}>
      {children}
    </I18nContext.Provider>
  );
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
