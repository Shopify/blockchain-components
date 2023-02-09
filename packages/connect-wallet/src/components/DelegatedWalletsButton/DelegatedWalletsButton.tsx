import {Text, DelegateCash as delegateCashIcon} from 'shared';

import {useTranslation} from '../../hooks/useTranslation';
import {WalletAddressRow} from '../WalletAddressRow';

import {
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
  const {t} = useTranslation('DelegatedWalletsButton');

  return (
    <Wrapper>
      <DelegatedWalletsButtonWrapper>
        <Icon>{delegateCashIcon}</Icon>
        <Text variant="bodyMd" bold as="span">
          {t( addresses.length > 1 ? ('buttonText') : ('buttonTextOneDelegate'), {amount: addresses.length})}
        </Text>
      </DelegatedWalletsButtonWrapper>
      <List>
        {addresses.map((address, index) => (
          <ListItem key={address}>
            <WalletAddressRow address={address} />
            {index < addresses.length - 1 ? (
              <Divider key={`${address}-divider`} />
            ) : null}
          </ListItem>
        ))}
      </List>
      <div>
      </div>
      {/* <Popover
        mobile={shouldUseMobileSizes}
        onDismiss={() => setAddressDetailsVisible(false)}
        visible={addressDetailsVisible}
      /> */}
    </Wrapper>
  );
};
