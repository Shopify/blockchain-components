import {RootProvider} from 'shared';
import {TokengateProps} from 'types';

import {Tokengate} from './Tokengate';

export const TokengateProvider = (props: TokengateProps) => {
  return (
    <RootProvider theme={props.theme}>
      <Tokengate {...props} />
    </RootProvider>
  );
};
