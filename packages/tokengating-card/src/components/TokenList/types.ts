export interface TokenListProps {
  tokens?: {
    title: string;
    subtitle: string;
    imageUrl: string;
    badge?: React.ReactNode;
    round?: boolean;
    orderLimit?: string;
  }[];
  separator?: React.ReactElement;
  isLoading?: boolean;
}
