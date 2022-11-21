import {useCallback} from 'react';

import {Icon, ListItemContent, SheetContent, WalletListItem} from '../style';
import {Button} from 'shared'
import {GetAWalletInformation} from '../../../constants/get-a-wallet';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';

const ConnectingScreen = () => {
  const {navigation} = useModal();

  const handleGetAWallet = useCallback(() => {
    navigation.navigate(ModalRoute.GetAWallet);
  }, []);

  return (
    <SheetContent>
      {GetAWalletInformation.map(({content, icon, title}) => {
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

export default ConnectingScreen;
