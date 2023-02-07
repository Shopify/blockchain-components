import {useCallback, useState} from 'react';
import {CaretDown, Text, DelegateCash as delegateCashIcon} from 'shared';

import {useTranslation} from '../../hooks/useTranslation';
import {WalletAddress} from '../WalletAddress';

import {
  CaretIcon,
  DelegatedWalletsButtonWrapper,
  Divider,
  Icon,
  List,
  ListItem,
  Wrapper,
} from './style';


interface Props {
  addresses: string[];
}

export const DelegatedWalletsButton = ({addresses}: Props) => {
  const [addressDetailsVisible, setAddressDetailsVisible] = useState(false);
  const {t} = useTranslation('DelegatedWalletsButton');

  const toggleAddressDetails = useCallback(() => {
    setAddressDetailsVisible(!addressDetailsVisible);
  }, [addressDetailsVisible]);

  return (
    <Wrapper>
      <DelegatedWalletsButtonWrapper
        fullWidth
        onClick={toggleAddressDetails}
        $addressDetailsVisible={addressDetailsVisible}
        size="Lg"
      >
        <Icon>{delegateCashIcon}</Icon>
        <Text as="span" variant="bodyLg">
          {t('buttonText', {amount: addresses.length})}
        </Text>
        <CaretIcon>{CaretDown}</CaretIcon>
      </DelegatedWalletsButtonWrapper>

      {addressDetailsVisible ? (
        <List>
          {addresses.map((address, index) => (
            <ListItem key={address}>
              <WalletAddress address={address} />
              {index < addresses.length - 1 ? (
                <Divider key={`${address}-divider`} />
              ) : null}
            </ListItem>
          ))}
        </List>
      ) : null}
      {/* <Popover
        mobile={shouldUseMobileSizes}
        onDismiss={() => setAddressDetailsVisible(false)}
        visible={addressDetailsVisible}
      /> */}
    </Wrapper>
  );
};
