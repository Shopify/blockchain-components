import {Text, DelegateCash as delegateCashIcon} from 'shared';

import {useTranslation} from '../../hooks/useTranslation';
import {WalletAddressRow} from '../WalletAddressRow';

import {Divider, Icon, List, ListItem, TitleWrapper, Wrapper} from './style';

interface Props {
  addresses: string[];
}

export const DelegatedWalletsDetail = ({addresses}: Props) => {
  const {t} = useTranslation('DelegatedWalletsDetail');

  return (
    <Wrapper>
      <TitleWrapper>
        <Icon>{delegateCashIcon}</Icon>
        <Text variant="bodyMd" bold as="span">
          {t('title', {count: addresses.length})}
        </Text>
      </TitleWrapper>

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
    </Wrapper>
  );
};
