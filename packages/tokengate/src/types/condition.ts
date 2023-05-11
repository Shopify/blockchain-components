import type {ReactNode} from 'react';

import type {LinkType} from './link';

export interface Condition {
  name?: string;
  imageUrl?: string;
  contractAddress?: string;
  links?: LinkType[];
  description?: ReactNode;
}
