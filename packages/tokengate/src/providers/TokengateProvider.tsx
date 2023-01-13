import {RootProvider} from 'shared';
import {TokengateProps} from 'types';

import {Tokengate} from '../components';

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
