import {Trans} from 'react-i18next';
import {Asset, Gift, Key, Text} from 'shared';

import {useTranslation} from '../../../hooks/useTranslation';
import {
  DelegateIntro,
  Icon,
  ListItemContent,
  SheetContent,
  WalletList,
  WalletListItem,
} from '../style';

const DELEGATE_LINK_TEXT = 'delegate.cash';

const WhatAreDelegatesScreen = () => {
  const {t} = useTranslation('Screens');

  return (
    <SheetContent rowGap="16px">
      <DelegateIntro variant="bodyMd" color="secondary">
        {t('WhatAreDelegates.intro')}
      </DelegateIntro>
      <WalletList>
        <Text variant="bodyLg" bold>
          {t('WhatAreDelegates.works')}
        </Text>
        <WalletListItem>
          <Icon>{Asset}</Icon>
          <ListItemContent>
            <Text as="p" color="secondary">
              <Trans i18nKey="WhatAreDelegates.home.content" t={t}>
                <a
                  href="https://delegate.cash"
                  rel="noreferrer"
                  target="_blank"
                >
                  {DELEGATE_LINK_TEXT}
                </a>
              </Trans>
            </Text>
          </ListItemContent>
        </WalletListItem>
        <WalletListItem>
          <Icon>{Key}</Icon>

          <ListItemContent>
            <Text as="p" color="secondary">
              {t('WhatAreDelegates.login.content')}
            </Text>
          </ListItemContent>
        </WalletListItem>
        <WalletListItem>
          <Icon>{Gift}</Icon>

          <ListItemContent>
            <Text as="p" color="secondary">
              {t('WhatAreDelegates.collaborativeCommerce.content')}
            </Text>
          </ListItemContent>
        </WalletListItem>
      </WalletList>
    </SheetContent>
  );
};

export default WhatAreDelegatesScreen;
