import {fireEvent} from '@testing-library/react';
import {vi} from 'vitest';
import {AnalyticsListenerTestHelper} from '@shopify/blockchain-components-analytics';

import {renderWithContext} from '../../tests/utils';

import {Button} from './Button';
import {DefaultArgs} from './fixtures';

const onClickEventName = 'CONNECT_BUTTON_CLICKED';

describe('Button', () => {
  describe('analytics', () => {
    it('sends onClick event if onClickEventName is defined', async () => {
      const onClickMock = vi.fn();
      const subscriberMock = vi.fn();
      const element = renderWithContext(
        <>
          <AnalyticsListenerTestHelper
            eventName={onClickEventName}
            mock={subscriberMock}
          />
          <Button
            {...DefaultArgs}
            label="label"
            onClick={onClickMock}
            onClickEventName={onClickEventName}
          />
          ,
        </>,
      );
      const button = await element.findByText('label');
      fireEvent.click(button);
      expect(onClickMock).toBeCalledTimes(1);
      expect(subscriberMock).toBeCalledTimes(1);
    });

    it('does not send onClick event if onClickEventName is undefined', async () => {
      const onClickMock = vi.fn();
      const subscriberMock = vi.fn();
      const element = renderWithContext(
        <>
          <AnalyticsListenerTestHelper
            eventName={onClickEventName}
            mock={subscriberMock}
          />
          <Button {...DefaultArgs} label="label" onClick={onClickMock} />,
        </>,
      );
      const button = await element.findByText('label');
      fireEvent.click(button);
      expect(onClickMock).toBeCalledTimes(1);
      expect(subscriberMock).toBeCalledTimes(0);
    });
  });
});
