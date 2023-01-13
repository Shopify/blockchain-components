import {GateRequirement} from 'types';

export const adaptRequirement = (gateRequirement?: {
  operator: 'OR' | 'AND';
  tokenSeries: {
    name: string;
    conditionsDescription: string;
    imageUrl: string;
    contractAddress: string;
  }[];
}): GateRequirement | undefined => {
  if (!gateRequirement) {
    return;
  }

  return {
    operator: gateRequirement.operator,
    conditions: gateRequirement.tokenSeries.map((tokenSeries) => ({
      collectionAddress: tokenSeries.contractAddress,
      name: tokenSeries.name,
      imageUrl: tokenSeries.imageUrl,
      conditionsDescription: 'Any token',
    })),
  };
};
