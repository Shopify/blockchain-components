/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {OrderLimitReachedWarningTextStyle} from './style';

const OrderLimitReachedWarning = () => (
  <>
    <OrderLimitReachedWarningTextStyle>
      {`You reached your order limit.
      Disconnect to try another wallet.`}
    </OrderLimitReachedWarningTextStyle>
  </>
);

export {OrderLimitReachedWarning};
