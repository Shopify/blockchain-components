import {RootProvider} from 'shared';
import {TokengateProps} from 'types';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {Tokengate} from '../components/Tokengate';

import {I18nProvider} from './I18nProvider';

export const TokengateProvider = (props: TokengateProps) => {
  return (
    <I18nProvider>
      <RootProvider theme={props.theme}>
        <Tokengate {...props} />
      </RootProvider>
    </I18nProvider>
  );
};
