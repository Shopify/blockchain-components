/* eslint-disable @shopify/jsx-no-hardcoded-content */

import {useCallback, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Button, Text} from 'shared';

import {Tokengate} from '../../Tokengate';
import {
  TokengatePropsConnectedFixture,
  ReactionFixture,
  RequirementsFixture,
} from '../../../../fixtures';
import {Reaction, Requirements} from '../../../../types';

import {Wrapper, TokengateWrapper, Controls, Control} from './style';

const exclusiveReaction = ReactionFixture();
const discountReaction = ReactionFixture({
  type: 'discount',
  discount: {
    type: 'amount',
    value: 20,
  },
});

export const Template: ComponentStory<typeof Tokengate> = () => {
  const [reaction, setReaction] = useState<Reaction>(exclusiveReaction);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [logic, setLogic] = useState<Requirements['logic']>('ALL');

  const onReactionChange = useCallback((reaction: string) => {
    const newReaction =
      reaction === 'discount' ? discountReaction : exclusiveReaction;
    setReaction(newReaction);
  }, []);

  return (
    <Wrapper>
      <TokengateWrapper>
        <Tokengate
          {...TokengatePropsConnectedFixture({
            isConnected: !isLocked,
            isLocked,
            reaction,
            requirements: RequirementsFixture({logic}),
          })}
          connectButton={<Button label="Connect wallet" fullWidth primary />}
          connectedButton={<Button label="0xab...aec9b" fullWidth />}
        />
      </TokengateWrapper>
      <Controls>
        <Control>
          <Text bold variant="headingSm">
            Reaction
          </Text>
          <label htmlFor="exclusive_access">
            <input
              id="exclusive_access"
              type="checkbox"
              aria-label="exclusive reaction"
              checked={reaction.type === 'exclusive_access'}
              onChange={() => onReactionChange('exclusive_access')}
            />
            <Text>Exclusive access</Text>
          </label>
          <label htmlFor="discount">
            <input
              id="discount"
              type="checkbox"
              aria-label="discount reaction"
              checked={reaction.type === 'discount'}
              onChange={() => onReactionChange('discount')}
            />
            <Text>Discount</Text>
          </label>
        </Control>
        <Control>
          <Text bold variant="headingSm">
            State
          </Text>
          <label htmlFor="locked">
            <input
              id="locked"
              type="checkbox"
              aria-label="locked"
              checked={isLocked}
              onChange={() => setIsLocked(true)}
            />
            <Text>Locked</Text>
          </label>
          <label htmlFor="unlocked">
            <input
              id="unlocked"
              type="checkbox"
              aria-label="unlocked"
              checked={!isLocked}
              onChange={() => setIsLocked(false)}
            />
            <Text>Unlocked</Text>
          </label>
        </Control>
        <Control>
          <Text bold variant="headingSm">
            Logic
          </Text>
          <label htmlFor="logic-all">
            <input
              id="logic-all"
              type="checkbox"
              aria-label="logic all"
              checked={logic === 'ALL'}
              onChange={() => setLogic('ALL')}
            />
            <Text>All</Text>
          </label>
          <label htmlFor="logic-any">
            <input
              id="logic-any"
              type="checkbox"
              aria-label="logic any"
              checked={logic === 'ANY'}
              onChange={() => setLogic('ANY')}
            />
            <Text>Any</Text>
          </label>
        </Control>
      </Controls>
    </Wrapper>
  );
};

const TokengateStory: ComponentMeta<typeof Tokengate> = {
  title: 'Tokengate',
  component: Tokengate,
};

export default TokengateStory;

export const Playground = Template.bind({});
