import {RootProvider} from 'shared';

import {Tokengate} from './Tokengate';
import {TokengateProps} from './types';

export const TokengateProvider = (props: TokengateProps) => {
  return (
    <RootProvider>
      <Tokengate {...props} />
    </RootProvider>
  );
};