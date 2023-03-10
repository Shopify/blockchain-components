import {eventNames} from '@shopify/blockchain-components';
import {useCallback} from 'react';
import {Asset, Button, Gift, Key, Text} from 'shared';

import {useTranslation} from '../../../hooks/useTranslation';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {
  ButtonContainer,
  Icon,
  ListItemContent,
  SheetContent,
  WalletList,
  WalletListItem,
} from '../style';

const WhatAreWalletsScreen = () => {
  const {navigation} = useModal();
  const {t} = useTranslation('Screens');

  const handleGetAWallet = useCallback(() => {
    navigation.navigate(ModalRoute.GetAWallet);
  }, [navigation]);

  return (
    <SheetContent rowGap="16px">
      <WalletList>
        <WalletListItem>
          <Icon>{Asset}</Icon>

          <ListItemContent>
            <Text as="h3" variant="headingSm">
              {t('WhatAreWallets.home.title')}
            </Text>

            <Text as="p" color="secondary">
              {t('WhatAreWallets.home.content')}
            </Text>
          </ListItemContent>
        </WalletListItem>
        <WalletListItem>
          <Icon>{Key}</Icon>

          <ListItemContent>
            <Text as="h3" variant="headingSm">
              {t('WhatAreWallets.login.title')}
            </Text>

            <Text as="p" color="secondary">
              {t('WhatAreWallets.login.content')}
            </Text>
          </ListItemContent>
        </WalletListItem>
        <WalletListItem>
          <Icon>{Gift}</Icon>

          <ListItemContent>
            <Text as="h3" variant="headingSm">
              {t('WhatAreWallets.collaborativeCommerce.title')}
            </Text>

            <Text as="p" color="secondary">
              {t('WhatAreWallets.collaborativeCommerce.content')}
            </Text>
          </ListItemContent>
        </WalletListItem>
      </WalletList>

      <ButtonContainer>
        <Button
          aria-label={t('WhatAreWallets.button')}
          fullWidth
          label={t('WhatAreWallets.button')}
          onClick={handleGetAWallet}
          size="Lg"
          onClickEventName={eventNames.CONNECT_WALLET_GET_WALLET_BUTTON_CLICKED}
        />
      </ButtonContainer>
    </SheetContent>
  );
};

export default WhatAreWalletsScreen;
