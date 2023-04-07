import {render} from '@testing-library/react';
import {Button} from 'shared';

import {ButtonWrapper} from './ButtonWrapper';

const LABEL_TEXT = 'Test button';

const DefaultButton = () => <Button label={LABEL_TEXT} />;

describe('ButtonWrapper', () => {
  describe('button props', () => {
    it('renders a provided JSX.Element', () => {
      const element = render(<ButtonWrapper button={<DefaultButton />} />);

      expect(element.findByLabelText(LABEL_TEXT)).toBeDefined();
    });

    it('renders a custom button', () => {
      const element = render(
        <ButtonWrapper
          button={{label: {key: 'soldOutLabel'}}}
          translationNamespace="Buttons"
        />,
      );

      expect(element.findByLabelText('Sold out')).toBeDefined();
    });
  });

  describe('text component', () => {
    it('renders a text component', () => {
      const element = render(
        <ButtonWrapper
          button={<DefaultButton />}
          text={{key: 'soldOutDescription'}}
          translationNamespace="Buttons"
        />,
      );

      expect(
        element.findByText('Check back later for stock updates', {
          selector: 'p',
        }),
      ).toBeDefined();
    });

    it('does not render a text component', () => {
      const element = render(<ButtonWrapper button={<DefaultButton />} />);

      expect(element.queryByTestId('button-wrapper-text')).toBeNull();
    });
  });
});
