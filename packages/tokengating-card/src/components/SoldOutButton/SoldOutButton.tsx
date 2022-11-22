import {
  SoldOutButtonStyle,
  SoldOutButtonTextStyle,
  SoldOutButtonDescriptionStyle,
} from './style';

const SoldOutButton = () => (
  <>
    <SoldOutButtonStyle>
      <SoldOutButtonTextStyle>Sold out</SoldOutButtonTextStyle>
    </SoldOutButtonStyle>
    <SoldOutButtonDescriptionStyle>
      Check back later for stock updates
    </SoldOutButtonDescriptionStyle>
  </>
);

export {SoldOutButton};
