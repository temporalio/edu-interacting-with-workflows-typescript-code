import { proxyActivities, log, defineSignal, defineQuery, setHandler, condition } from '@temporalio/workflow';
import { ApplicationFailure } from '@temporalio/common';
import type * as activities from './activities';
import { Distance, OrderConfirmation, PizzaOrder } from './shared';

const { sendBill, getDistance } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: {
    maximumInterval: '10 seconds',
  },
});

export const fulfillOrderSignal = defineSignal<[boolean]>('pizzaOrderFulfilled');
export const orderStatusQuery = defineQuery<string>('orderStatusQuery');

export async function pizzaWorkflow(order: PizzaOrder): Promise<OrderConfirmation | string> {
  let totalPrice = 0;

  setHandler(orderStatusQuery, () => {
    return order.orderStatus;
  });

  if (order.isDelivery) {
    let distance: Distance | undefined = undefined;

    try {
      distance = await getDistance(order.address);
    } catch (e) {
      log.error('Unable to get distance', {});
      order.orderStatus == 'Canceled';
      throw e;
    }
    if (distance.kilometers > 25) {
      order.orderStatus == 'Canceled';
      throw new ApplicationFailure('Customer lives too far away for delivery');
    }
    order.orderStatus = 'Preparing for delivery';
  }

  for (const pizza of order.items) {
    totalPrice += pizza.price;
  }
  order.orderStatus = 'Preparing pizzas';

  let signalProcessed = false;

  setHandler(fulfillOrderSignal, (isOrderFulfilled) => {
    order.orderStatus = 'Fulfilled';
    signalProcessed = isOrderFulfilled;
  });

  await condition(() => signalProcessed, 5000);

  if (order.orderStatus !== 'Canceled') {
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
  } else {
    //If the order is not fulfilled, handle accordingly
    order.orderStatus == 'Canceled';
    return 'Order was not fulfilled. Not billing customer.';
  }
}
