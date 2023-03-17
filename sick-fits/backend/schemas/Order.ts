import { integer, text, relationship, virtual } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver(item): string {
        return `${formatMoney(item?.total || 0)}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
