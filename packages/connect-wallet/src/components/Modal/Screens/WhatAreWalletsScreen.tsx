import {useI18n} from '@shopify/react-i18n';
import {useCallback} from 'react';
import {Button, Gift, Key, Text, Wallet} from 'shared';

import {Icon, ListItemContent, SheetContent, WalletListItem} from '../style';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';

const WhatAreWalletsScreen = () => {
  const [i18n] = useI18n();
  const {navigation} = useModal();

  const handleGetAWallet = useCallback(() => {
    navigation.navigate(ModalRoute.GetAWallet);
  }, [navigation]);

  return (
    <SheetContent>
      <WalletListItem>
        <Icon>{Wallet}</Icon>

        <ListItemContent>
          <Text as="h3" variant="headingSm">
            {i18n.translate('modalScreens.WhatAreWallets.home.title')}
          </Text>

          <Text as="p">
            {i18n.translate('modalScreens.WhatAreWallets.home.content')}
          </Text>
        </ListItemContent>
      </WalletListItem>
      <WalletListItem>
        <Icon>{Key}</Icon>

        <ListItemContent>
          <Text as="h3" variant="headingSm">
            {i18n.translate('modalScreens.WhatAreWallets.login.title')}
          </Text>

          <Text as="p">
            {i18n.translate('modalScreens.WhatAreWallets.login.content')}
          </Text>
        </ListItemContent>
      </WalletListItem>
      <WalletListItem>
        <Icon>{Gift}</Icon>

        <ListItemContent>
          <Text as="h3" variant="headingSm">
            {i18n.translate(
              'modalScreens.WhatAreWallets.collaborativeCommerce.title',
            )}
          </Text>

          <Text as="p">
            {i18n.translate(
              'modalScreens.WhatAreWallets.collaborativeCommerce.content',
            )}
          </Text>
        </ListItemContent>
      </WalletListItem>

      <Button label="Get a wallet" onClick={handleGetAWallet} />
    </SheetContent>
  );
};

export default WhatAreWalletsScreen;
