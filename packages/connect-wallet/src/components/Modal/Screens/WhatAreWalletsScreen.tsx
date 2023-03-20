import {eventNames} from '@shopify/blockchain-components';
import {useCallback} from 'react';
import {Asset, Button, Gift, Key, Text} from 'shared';

import {useAppDispatch} from '../../../hooks/useAppState';
import {useTranslation} from '../../../hooks/useTranslation';
import {navigate} from '../../../slices/modalSlice';

interface ListItemProps {
  content: string;
  icon: JSX.Element;
  title: string;
}

const ListItem = ({content, icon, title}: ListItemProps) => {
  return (
    <div className="sbc-flex sbc-items-start sbc-gap-x-4">
      <div className="sbc-h-6 sbc-w-6 sbc-flex-shrink-0 sbc-text-primary">
        {icon}
      </div>

      <div className="sbc-flex-grow">
        <Text as="h3" className="sbc-mb-1" variant="headingSm">
          {title}
        </Text>

        <Text as="p" color="secondary">
          {content}
        </Text>
      </div>
    </div>
  );
};

const WhatAreWalletsScreen = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation('Screens');

  const handleGetAWallet = useCallback(() => {
    dispatch(navigate('GetAWallet'));
  }, [dispatch]);

  const listItems = [
    {
      content: t('WhatAreWallets.home.content'),
      icon: Asset,
      title: t('WhatAreWallets.home.title'),
    },
    {
      content: t('WhatAreWallets.login.content'),
      icon: Key,
      title: t('WhatAreWallets.login.title'),
    },
    {
      content: t('WhatAreWallets.collaborativeCommerce.content'),
      icon: Gift,
      title: t('WhatAreWallets.collaborativeCommerce.title'),
    },
  ];

  return (
    <div className="sbc-flex sbc-flex-col sbc-justify-center sbc-gap-y-6 sbc-p-popover sbc-pt-3">
      {listItems.map((item) => (
        <ListItem key={item.title} {...item} />
      ))}

      <Button
        aria-label={t('WhatAreWallets.button')}
        fullWidth
        label={t('WhatAreWallets.button')}
        onClick={handleGetAWallet}
        onClickEventName={eventNames.CONNECT_WALLET_GET_WALLET_BUTTON_CLICKED}
        size="Lg"
      />
    </div>
  );
};

export default WhatAreWalletsScreen;
