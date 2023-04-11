import {render} from '@testing-library/react';

import {RequirementsFixture} from '../../fixtures';

import {TokengateRequirements} from './TokengateRequirements';

describe('TokengateRequirements', () => {
  describe('No segment state', () => {
    it('renders the no segment state when no conditions are provided', () => {
      const element = render(
        <TokengateRequirements requirements={{conditions: [], logic: 'ALL'}} />,
      );

      expect(element.queryByTestId('no-segments')).toBeDefined();
    });

    it('does not render the no segment state when conditions are provided', () => {
      const requirements = RequirementsFixture();

      const element = render(
        <TokengateRequirements requirements={requirements} />,
      );

      expect(element.queryByTestId('no-segments')).toBeNull();
    });

    it('does not render the no segment state when conditions are not provided and the tokengate is loading', () => {
      const element = render(
        <TokengateRequirements
          isLoading
          requirements={{conditions: [], logic: 'ALL'}}
        />,
      );

      expect(element.queryByTestId('no-segments')).toBeNull();
    });
  });
});
