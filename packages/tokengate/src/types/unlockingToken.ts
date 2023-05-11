export interface UnlockingToken {
  name: string;
  imageUrl: string;
  collectionName: string;
  contractAddress: string;
  consumedRedemptionLimit?: number;
}
