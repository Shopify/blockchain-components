import {TokengateRequirements} from './TokengateRequirements';

import {
  ConditionArrayFixture,
  ConditionFixture,
  UnlockingTokenFixture,
} from '~/fixtures';
import {render, screen} from '~/tests/test-utils';

describe('TokengateRequirements', () => {
  describe('TokenList name validation', () => {
    it('displays tokens with the provided name', () => {
      render(
        <TokengateRequirements
          requirements={{
            conditions: [ConditionFixture()],
            logic: 'ANY',
          }}
        />,
      );

      expect(screen.findByText('CryptoPunks')).toBeDefined();
    });

    it('displays the formatted contract address when a name is not provided', () => {
      render(
        <TokengateRequirements
          requirements={{
            conditions: [{...ConditionFixture(), name: undefined}],
            logic: 'ANY',
          }}
        />,
      );

      expect(screen.findByText('contract 0xb4...3BBB')).toBeDefined();
    });

    it('displays the formatted contract address when a name is not provided', () => {
      render(
        <TokengateRequirements
          requirements={{
            conditions: [
              {
                name: undefined,
                contractAddress: undefined,
                imageUrl:
                  'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=384',
              },
            ],
            logic: 'ANY',
          }}
        />,
      );

      expect(screen.queryByText('CryptoPunks')).toBeNull();
      expect(screen.queryByText('contract 0xb4...3BBB')).toBeNull();
    });
  });

  describe('Unlocking tokens cross badge', () => {
    it('displays a cross badge when hasMissingTokens is true', () => {
      render(
        <TokengateRequirements
          hasMissingTokens
          requirements={{
            conditions: ConditionArrayFixture(),
            logic: 'ALL',
          }}
          unlockingTokens={[UnlockingTokenFixture({})]}
        />,
      );

      expect(screen.queryAllByTestId('tokenbase').length).toStrictEqual(2);
      expect(screen.queryAllByTestId('tokenbase-badge').length).toStrictEqual(
        1,
      );
    });

    it('does not display a cross badge when hasMissingTokens is false', () => {
      render(
        <TokengateRequirements
          requirements={{
            conditions: ConditionArrayFixture(),
            logic: 'ALL',
          }}
        />,
      );

      expect(screen.queryAllByTestId('tokenbase').length).toStrictEqual(2);
      expect(screen.queryAllByTestId('tokenbase-badge').length).toStrictEqual(
        0,
      );
    });
  });
});
