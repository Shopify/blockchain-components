export type DelegationType = 'NONE' | 'ALL' | 'CONTRACT' | 'TOKEN';

export interface DelegationInfo {
  type: DelegationType;
  vault: string;
  delegate: string;
  contract?: string;
  tokenId?: number;
}
