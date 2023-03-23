import {Trans} from 'react-i18next';
import {Asset, Link, Text, Wifi} from 'shared';

import {useTranslation} from '../../../hooks/useTranslation';

const DELEGATE_CASH_URL = 'https://delegate.cash';

interface ListItemProps {
  content: string | JSX.Element;
  icon: JSX.Element;
}

const ListItem = ({content, icon}: ListItemProps) => {
  return (
    <div className="sbc-flex sbc-items-start sbc-gap-x-4">
      <div className="sbc-h-6 sbc-w-5 sbc-flex-shrink-0 sbc-pt-1 sbc-text-primary">
        {icon}
      </div>
      <div className="sbc-flex-grow">
        <Text as="p" color="secondary">
          {content}
        </Text>
      </div>
    </div>
  );
};

const DelegateWalletsScreen = () => {
  const {t} = useTranslation('Screens');

  const linkContent = (
    <Trans
      components={[
        <Text
          as="a"
          color="secondary"
          className="sbc-cursor-pointer sbc-underline"
          href={DELEGATE_CASH_URL}
          key={0}
        />,
      ]}
      i18nKey="DelegateWallets.link"
      t={t}
    />
  );

  const listItems = [
    {
      content: linkContent,
      icon: Link,
      key: 'link',
    },
    {
      content: t('DelegateWallets.connect'),
      icon: Asset,
      key: 'connect',
    },
    {
      content: t('DelegateWallets.perks'),
      icon: Wifi,
      key: 'perks',
    },
  ];

  return (
    <div className="sbc-flex sbc-flex-col sbc-justify-center sbc-gap-y-6 sbc-p-popover sbc-pt-3">
      <Text as="p" color="secondary">
        {t('DelegateWallets.description')}
      </Text>
      <div className="sbc-flex sbc-flex-col sbc-gap-y-4">
        <Text variant="headingSm">{t('DelegateWallets.howItWorks')}</Text>
        {listItems.map((item) => (
          <ListItem key={item.key} content={item.content} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};

export default DelegateWalletsScreen;
