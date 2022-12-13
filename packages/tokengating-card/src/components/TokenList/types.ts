export interface TokenListProps {
  tokens?: {
    title: string;
    subtitle: string;
    imageUrl: string;
    badge?: React.ReactNode;
    round?: boolean;
    rightContent?: string;
  }[];
  separator?: React.ReactElement;
  isLoading?: boolean;
}
