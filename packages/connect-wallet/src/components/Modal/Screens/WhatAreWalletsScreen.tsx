import {useCallback} from 'react';
import {Apps, Button, Gift, Key, Text} from 'shared';

import {useTranslation} from '../../../hooks/useTranslation';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {Icon, ListItemContent, SheetContent, WalletListItem} from '../style';

const WhatAreWalletsScreen = () => {
  const {navigation} = useModal();
  const {t} = useTranslation('Screens');

  const handleGetAWallet = useCallback(() => {
    navigation.navigate(ModalRoute.GetAWallet);
  }, [navigation]);

  return (
    <SheetContent>
      <WalletListItem>
        <Icon>{Apps}</Icon>

        <ListItemContent>
          <Text as="h3" variant="headingSm">
            {t('WhatAreWallets.home.title')}
          </Text>

          <Text as="p">{t('WhatAreWallets.home.content')}</Text>
        </ListItemContent>
      </WalletListItem>
      <WalletListItem>
        <Icon>{Key}</Icon>

        <ListItemContent>
          <Text as="h3" variant="headingSm">
            {t('WhatAreWallets.login.title')}
          </Text>

          <Text as="p">{t('WhatAreWallets.login.content')}</Text>
        </ListItemContent>
      </WalletListItem>
      <WalletListItem>
        <Icon>{Gift}</Icon>

        <ListItemContent>
          <Text as="h3" variant="headingSm">
            {t('WhatAreWallets.collaborativeCommerce.title')}
          </Text>

          <Text as="p">
            {t('WhatAreWallets.collaborativeCommerce.content')}
          </Text>
        </ListItemContent>
      </WalletListItem>

      <Button label="Get a wallet" onClick={handleGetAWallet} />
    </SheetContent>
  );
};

export default WhatAreWalletsScreen;
