import {Requirements} from 'types';

export const adaptRequirements = (gateRequirement?: {
  operator: 'OR' | 'AND';
  tokenSeries: {
    name: string;
    conditionsDescription: string;
    imageUrl: string;
    contractAddress: string;
  }[];
}): Requirements | undefined => {
  if (!gateRequirement) {
    return;
  }

  return {
    logic: gateRequirement.operator === 'AND' ? 'ALL' : 'ANY',
    conditions: gateRequirement.tokenSeries.map((tokenSeries) => ({
      collectionAddress: tokenSeries.contractAddress,
      name: tokenSeries.name,
      imageUrl: tokenSeries.imageUrl,
      conditionsDescription: 'Any token',
    })),
  };
};
