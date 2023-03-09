import {Link, Requirements} from '../../types';

export const adaptRequirements = (gateRequirement?: {
  operator: 'OR' | 'AND';
  tokenSeries: {
    name: string;
    imageUrl: string;
    links: Link[];
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
      links: tokenSeries.links,
      imageUrl: tokenSeries.imageUrl,
    })),
  };
};
