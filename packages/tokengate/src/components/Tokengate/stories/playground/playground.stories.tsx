/* eslint-disable @shopify/jsx-no-hardcoded-content */

import {ReactNode, useCallback, useState} from 'react';
import {Meta, StoryObj} from '@storybook/react';
import {Button, Text} from 'shared';

import {Tokengate} from '../../Tokengate';
import {
  TokengatePropsConnectedFixture,
  ReactionFixture,
  RequirementsFixture,
} from '../../../../fixtures';
import {Reaction, Requirements} from '../../../../types';

const exclusiveReaction = ReactionFixture();
const discountReaction = ReactionFixture({
  type: 'discount',
  discount: {
    type: 'fixedAmount',
    value: 20,
  },
});

interface WithChildrenProps {
  children: ReactNode;
}

const Controls = ({children}: WithChildrenProps) => {
  return <div className="sbc-flex sbc-flex-col sbc-gap-y-6">{children}</div>;
};

const ControlGroup = ({children}: WithChildrenProps) => {
  return <div className="sbc-flex sbc-flex-col">{children}</div>;
};

const Control = ({children}: WithChildrenProps) => {
  return <div className="sbc-flex sbc-gap-x-2">{children}</div>;
};

export const Template = () => {
  const [reaction, setReaction] = useState<Reaction>(exclusiveReaction);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logic, setLogic] = useState<Requirements['logic']>('ALL');

  const onReactionChange = useCallback((reaction: string) => {
    const newReaction =
      reaction === 'discount' ? discountReaction : exclusiveReaction;
    setReaction(newReaction);
  }, []);

  return (
    <div className="sbc-flex sbc-flex-col sbc-gap-3 md:sbc-flex-row md:sbc-gap-6">
      <div className="sbc-min-w-[400px] sbc-max-w-2xl">
        <Tokengate
          {...TokengatePropsConnectedFixture({
            isConnected: !isLocked,
            isLocked,
            reaction,
            requirements: RequirementsFixture({logic}),
          })}
          isLoading={isLoading}
          connectButton={<Button label="Connect wallet" fullWidth primary />}
          connectedButton={<Button label="0xab...aec9b" fullWidth />}
        />
      </div>
      <Controls>
        <ControlGroup>
          <Text variant="headingSm">Reaction</Text>
          <Control>
            <input
              id="exclusive_access"
              type="checkbox"
              aria-label="exclusive reaction"
              checked={reaction.type === 'exclusive_access'}
              onChange={() => onReactionChange('exclusive_access')}
            />
            <Text as="label" htmlFor="exclusive_access">
              Exclusive access
            </Text>
          </Control>

          <Control>
            <input
              id="discount"
              type="checkbox"
              aria-label="discount reaction"
              checked={reaction.type === 'discount'}
              onChange={() => onReactionChange('discount')}
            />
            <Text as="label" htmlFor="discount">
              Discount
            </Text>
          </Control>
        </ControlGroup>

        <ControlGroup>
          <Text variant="headingSm">State</Text>
          <Control>
            <input
              id="locked"
              type="checkbox"
              aria-label="locked"
              checked={isLocked}
              onChange={() => setIsLocked(true)}
            />
            <Text as="label" htmlFor="locked">
              Locked
            </Text>
          </Control>

          <Control>
            <input
              id="unlocked"
              type="checkbox"
              aria-label="unlocked"
              checked={!isLocked}
              onChange={() => setIsLocked(false)}
            />
            <Text as="label" htmlFor="unlocked">
              Unlocked
            </Text>
          </Control>
        </ControlGroup>

        <ControlGroup>
          <Text variant="headingSm">Logic</Text>
          <Control>
            <input
              id="logic-all"
              type="checkbox"
              aria-label="logic all"
              checked={logic === 'ALL'}
              onChange={() => setLogic('ALL')}
            />
            <Text as="label" htmlFor="logic-all">
              All
            </Text>
          </Control>

          <Control>
            <input
              id="logic-any"
              type="checkbox"
              aria-label="logic any"
              checked={logic === 'ANY'}
              onChange={() => setLogic('ANY')}
            />
            <Text as="label" htmlFor="logic-any">
              Any
            </Text>
          </Control>
        </ControlGroup>

        <ControlGroup>
          <Text variant="headingSm">Loading</Text>
          <Control>
            <input
              id="loading"
              type="checkbox"
              aria-label="loading"
              checked={isLoading}
              onChange={() => setIsLoading(!isLoading)}
            />
            <Text as="label" htmlFor="loading">
              Loading
            </Text>
          </Control>
        </ControlGroup>
      </Controls>
    </div>
  );
};

const TokengateStory: Meta<typeof Tokengate> = {
  title: 'Tokengate',
  component: Tokengate,
};

type Story = StoryObj<typeof Template>;

export const Playground: Story = {
  parameters: {
    controls: {hideNoControlsWarning: true},
  },
  render: () => Template(),
};

export default TokengateStory;
