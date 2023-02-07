import {Text} from 'shared';

export const OrderLimit = ({
  consumedOrderLimit,
  limitPerToken,
}: {
  consumedOrderLimit?: number;
  limitPerToken?: number;
}) => {
  if (
    typeof consumedOrderLimit !== 'number' ||
    typeof limitPerToken !== 'number'
  ) {
    return null;
  }

  const markup = `${consumedOrderLimit}/${limitPerToken}`;

  return (
    <Text as="span" variant="bodySm" color="secondary">
      {markup}
    </Text>
  );
};
