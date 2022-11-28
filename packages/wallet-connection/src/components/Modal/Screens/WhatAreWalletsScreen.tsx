import {useCallback} from 'react';
import {Button} from 'shared';

import {Icon, ListItemContent, SheetContent, WalletListItem} from '../style';
import {WhatAreWalletsInformation} from '../../../constants/what-are-wallets';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';

const WhatAreWalletsScreen = () => {
  const {navigation} = useModal();

  const handleGetAWallet = useCallback(() => {
    navigation.navigate(ModalRoute.GetAWallet);
  }, []);

  return (
    <SheetContent>
      {WhatAreWalletsInformation.map(({content, icon, title}) => {
        return (
          <WalletListItem>
            <Icon>{icon}</Icon>

            <ListItemContent>
              <h3>{title}</h3>

              <p>{content}</p>
            </ListItemContent>
          </WalletListItem>
        );
      })}

      <Button label="Get a wallet" onClick={handleGetAWallet} />
    </SheetContent>
  );
};

export default WhatAreWalletsScreen;
