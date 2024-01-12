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

// TODO Part A: Use defineQuery to define a Query which we will call orderDetailsQuery.
// Fill in the Query type, which should be 'orderDetailsQuery'.
export const orderDetailsQuery = defineQuery<PizzaOrder[keyof PizzaOrder], [keyof PizzaOrder]>('');

export async function pizzaWorkflow(order: PizzaOrder): Promise<OrderConfirmation | void> {
  let totalPrice = 0;

  setHandler(orderDetailsQuery, (key: keyof PizzaOrder): PizzaOrder[keyof PizzaOrder] => {
    return 'placeholder';
    // TODO Part B: Remove the line above and return the value of the key on the `order` object.
    // For example, if someone inputs 'orderNumber' into the orderDetails query, this query should return the value of the orderNumber which is found on the order object.
    // Don't forget to JSON.stringify the returned response, because some of the values on the order object are JSON.
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
