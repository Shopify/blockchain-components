import {useI18n} from '@shopify/react-i18n';
import {useCallback} from 'react';
import {Apps, Button, Gift, Key} from 'shared';

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
        <Icon>{Apps}</Icon>

        <ListItemContent>
          <h3>{i18n.translate('modalScreens.WhatAreWallets.home.title')}</h3>

          <p>{i18n.translate('modalScreens.WhatAreWallets.home.content')}</p>
        </ListItemContent>
      </WalletListItem>
      <WalletListItem>
        <Icon>{Key}</Icon>

        <ListItemContent>
          <h3>{i18n.translate('modalScreens.WhatAreWallets.login.title')}</h3>

          <p>{i18n.translate('modalScreens.WhatAreWallets.login.content')}</p>
        </ListItemContent>
      </WalletListItem>
      <WalletListItem>
        <Icon>{Gift}</Icon>

        <ListItemContent>
          <h3>
            {i18n.translate(
              'modalScreens.WhatAreWallets.collaborativeCommerce.title',
            )}
          </h3>

          <p>
            {i18n.translate(
              'modalScreens.WhatAreWallets.collaborativeCommerce.content',
            )}
          </p>
        </ListItemContent>
      </WalletListItem>

      <Button label="Get a wallet" onClick={handleGetAWallet} />
    </SheetContent>
  );
};

export default WhatAreWalletsScreen;
