import {Text} from 'shared';

const Error = ({text}: {text?: string}) => (
  <Text
    as="p"
    className="sbc-mt-2 sbc-whitespace-pre-line sbc-text-center"
    color="critical"
    variant="bodyMd"
  >
    {text}
  </Text>
);

export {Error};
