import {ReactNode} from 'react';

import {LinkType} from '~/types';

interface Token {
  title: string;
  subtitle: ReactNode;
  imageUrl?: string;
  badge?: React.ReactNode;
  round?: boolean;
  rightContent?: React.ReactNode;
  links?: LinkType[];
  isUnlocked?: boolean;
}

export interface TokenListProps {
  tokens?: Token[];
  separator?: React.ReactElement;
  isLoading?: boolean;
}
