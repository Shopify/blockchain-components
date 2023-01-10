import {Text} from 'shared';

import {UnlockingToken} from '../Tokengate';

type OrderLimitProps = Pick<
  UnlockingToken['token'],
  'totalOrderLimit' | 'consumedOrderLimit'
>;

export const OrderLimit = ({
  consumedOrderLimit,
  totalOrderLimit,
}: OrderLimitProps) => {
  if (
    typeof consumedOrderLimit !== 'number' ||
    typeof totalOrderLimit !== 'number'
  ) {
    return null;
  }

  const markup = `${consumedOrderLimit}/${totalOrderLimit}`;

  return (
    <Text as="span" variant="bodySm" color="secondary">
      {markup}
    </Text>
  );
};
