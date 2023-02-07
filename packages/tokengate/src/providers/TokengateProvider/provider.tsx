import {I18nextProvider} from 'react-i18next';
import {RootProvider} from 'shared';

import {Tokengate} from '../../components';
import {TokengateProps} from '../../types';

import i18n from './i18n';

export const TokengateProvider = (props: TokengateProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <RootProvider theme={props.theme}>
        <Tokengate {...props} />
      </RootProvider>
    </I18nextProvider>
  );
};
