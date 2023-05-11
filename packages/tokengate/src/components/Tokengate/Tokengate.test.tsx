import {render} from '@testing-library/react';
import {Button} from 'shared';

import {
  RequirementsFixture,
  UnlockingTokenFixture,
  UnlockingTokenFixtureType,
} from '../../fixtures';
import {TokengateProps} from '../../types/props';

import {Tokengate} from './Tokengate';

const LABEL_TEXT = 'Test button';

const PlaceholderButton = () => <Button label={LABEL_TEXT} />;

const ALL_REQUIREMENTS = RequirementsFixture({logic: 'ALL'});
const ANY_REQUIREMENTS = RequirementsFixture();
const CRYPTO_PUNKS_FIXTURE = UnlockingTokenFixture({});
const MOONBIRDS_FIXTURE = UnlockingTokenFixture({
  type: UnlockingTokenFixtureType.Moonbirds,
});

describe('Tokengate', () => {
  const defaultProps: TokengateProps = {
    connectButton: <PlaceholderButton />,
    isConnected: true,
    requirements: ALL_REQUIREMENTS,
    unlockingTokens: [CRYPTO_PUNKS_FIXTURE, MOONBIRDS_FIXTURE],
  };

  describe('Error text', () => {
    describe('requirements.operator / ALL', () => {
      it('does not render error text when all required tokens are present', () => {
        const element = render(<Tokengate {...defaultProps} />);

        expect(
          element.queryAllByText("You don't have all required tokens").length,
        ).toStrictEqual(0);

        expect(
          element.queryAllByText("You don't have a required token").length,
        ).toStrictEqual(0);
      });

      it('renders error text with correct error when not all required tokens are present', () => {
        const element = render(
          <Tokengate
            {...defaultProps}
            unlockingTokens={[CRYPTO_PUNKS_FIXTURE]}
          />,
        );

        expect(
          element.findByText("You don't have all required tokens"),
        ).toBeDefined();

        expect(
          element.queryAllByText("You don't have a required token").length,
        ).toStrictEqual(0);
      });
    });

    describe('requirements.operator / ANY', () => {
      it('does not render error text when a required token is present', () => {
        const element = render(
          <Tokengate {...defaultProps} requirements={ANY_REQUIREMENTS} />,
        );

        expect(
          element.queryAllByText("You don't have all required tokens").length,
        ).toStrictEqual(0);

        expect(
          element.queryAllByText("You don't have a required token").length,
        ).toStrictEqual(0);
      });

      it('renders error text with correct error when a required token is not present', () => {
        const element = render(
          <Tokengate
            {...defaultProps}
            requirements={ANY_REQUIREMENTS}
            unlockingTokens={[]}
          />,
        );

        expect(
          element.findByText("You don't have a required token"),
        ).toBeDefined();

        expect(
          element.queryAllByText("You don't have all required tokens").length,
        ).toStrictEqual(0);
      });
    });
  });
});
