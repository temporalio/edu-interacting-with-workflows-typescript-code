import { proxyActivities, log, setHandler, defineQuery } from '@temporalio/workflow';
import { ApplicationFailure } from '@temporalio/common';
import type * as activities from './activities';
import { Distance, OrderConfirmation, PizzaOrder } from './shared';

const { sendBill, getDistance } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: {
    maximumInterval: '10 seconds',
  },
});

export const orderDetailsQuery = defineQuery<PizzaOrder[keyof PizzaOrder], [keyof PizzaOrder]>('orderDetailsQuery');

export async function pizzaWorkflow(order: PizzaOrder): Promise<OrderConfirmation | void> {
  let totalPrice = 0;

  setHandler(orderDetailsQuery, (key: keyof PizzaOrder): PizzaOrder[keyof PizzaOrder] => {
    return JSON.stringify(order[key]);
  });

  if (order.isDelivery) {
    let distance: Distance | undefined = undefined;

    try {
      distance = await getDistance(order.address);
    } catch (e) {
      log.error('Unable to get distance', {});
      throw e;
    }
    if (distance.kilometers > 25) {
      throw new ApplicationFailure('Customer lives too far away for delivery');
    }
  }

  for (const pizza of order.items) {
    totalPrice += pizza.price;
  }

  const bill = {
    customerID: order.customer.customerID,
    orderNumber: order.orderNumber,
    amount: totalPrice,
    description: 'Pizza',
  };

  try {
    return await sendBill(bill);
  } catch (e) {
    log.error('Unable to bill customer', {});
    throw e;
  }
}
