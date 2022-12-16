/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {SoldOutButtonStyle, SoldOutButtonDescriptionStyle} from './style';

const SoldOutButton = () => (
  <>
    <SoldOutButtonStyle>Sold out</SoldOutButtonStyle>
    <SoldOutButtonDescriptionStyle>
      Check back later for stock updates
    </SoldOutButtonDescriptionStyle>
  </>
);

export {SoldOutButton};
