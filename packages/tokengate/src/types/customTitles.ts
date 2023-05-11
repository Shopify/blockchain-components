import type {ReactNode} from 'react';

export interface CustomTitles {
  lockedTitle?: ReactNode;
  lockedSubtitle?: ReactNode;
  unlockedTitle?: ReactNode;
  unlockedSubtitle?: ReactNode;
  unlockedSubtitleWithRedemptionLimit?: ReactNode;
}
