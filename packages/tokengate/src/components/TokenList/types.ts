import {ReactNode} from 'react';
import {Link} from 'src/types';

export interface TokenListProps {
  tokens?: {
    title: string;
    subtitle: ReactNode;
    imageUrl?: string;
    badge?: React.ReactNode;
    round?: boolean;
    rightContent?: React.ReactNode;
    links?: Link[];
    isUnlocked?: boolean;
  }[];
  separator?: React.ReactElement;
  isLoading?: boolean;
}
