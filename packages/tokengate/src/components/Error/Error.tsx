import {Text} from 'shared';

import {Wrapper} from './style';

const Error = ({text}: {text?: string}) => (
  <Wrapper>
    <Text as="p" variant="bodyMd" color="critical">
      {text}
    </Text>
  </Wrapper>
);

export {Error};
