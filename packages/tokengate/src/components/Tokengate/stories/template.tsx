import {Button} from 'shared';

import {Tokengate} from '../Tokengate';
import type {TokengateProps} from '../../../types';

export const Template = (args: TokengateProps) => (
  <Tokengate
    {...args}
    connectButton={<Button label="Connect wallet" fullWidth primary />}
    connectedButton={<Button label="0xab...aec9b" fullWidth />}
  />
);

export const DefaultArgTypes = {
  active: {
    table: {
      disable: true,
    },
  },
  connectButton: {
    table: {
      disable: true,
    },
  },
  connectedButton: {
    table: {
      disable: true,
    },
  },
  discountCustomTitles: {
    table: {
      disable: true,
    },
  },
  exclusiveCustomTitles: {
    table: {
      disable: true,
    },
  },
  isConnected: {
    table: {
      disable: true,
    },
  },
  isLoading: {
    table: {
      disable: true,
    },
  },
  isLocked: {
    table: {
      disable: true,
    },
  },
  isSoldOut: {
    table: {
      disable: true,
    },
  },
  reaction: {
    table: {
      disable: true,
    },
  },
  redemptionLimit: {
    table: {
      disable: true,
    },
  },
  requirements: {
    table: {
      disable: true,
    },
  },
  theme: {
    table: {
      disable: true,
    },
  },
  unlockingTokens: {
    table: {
      disable: true,
    },
  },
};
