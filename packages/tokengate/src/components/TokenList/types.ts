import {ReactNode} from 'react';

export interface TokenListProps {
  tokens?: {
    title: string;
    subtitle: ReactNode;
    imageUrl?: string;
    badge?: React.ReactNode;
    round?: boolean;
    rightContent?: React.ReactNode;
  }[];
  separator?: React.ReactElement;
  isLoading?: boolean;
}
