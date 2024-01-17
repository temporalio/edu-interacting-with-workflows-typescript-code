import { upsertSearchAttributes, proxyActivities, log, defineSignal, setHandler, condition } from '@temporalio/workflow';
import { ApplicationFailure } from '@temporalio/common';
import type * as activities from '../activities';
import { Distance, OrderConfirmation, PizzaOrder } from '../shared';

const { sendBill, getDistance } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: {
    maximumInterval: '10 seconds',
  },
});

export const fulfillOrderSignal = defineSignal<[boolean]>('pizzaOrderFulfilled');

export async function pizzaWorkflow(order: PizzaOrder): Promise<OrderConfirmation | void> {
  let totalPrice = 0;
  let signalProcessed = false;

  if (order.isDelivery) {
    let distance: Distance | undefined = undefined;

    try {
      distance = await getDistance(order.address);
    } catch (e) {
      log.error('Unable to get distance', {});
      throw e;
    }
    if (distance.kilometers > 25) {
      upsertSearchAttributes({ isOrderFailed: [true] });
      throw new ApplicationFailure('Customer lives too far away for delivery');
    }
  }

  for (const pizza of order.items) {
    totalPrice += pizza.price;
  }

  setHandler(fulfillOrderSignal, (isOrderFulfilled) => {
    order.isFulfilled = isOrderFulfilled;
    signalProcessed = true;
  });

  await condition(() => signalProcessed);

  if (order.isFulfilled) {
    const bill = {
      customerID: order.customer.customerID,
      orderNumber: order.orderNumber,
      amount: totalPrice,
      description: 'Pizza',
    };

    try {
      upsertSearchAttributes({ isOrderFailed: [false] });
      return await sendBill(bill);
    } catch (e) {
      log.error('Unable to bill customer', {});
      upsertSearchAttributes({ isOrderFailed: [true] });
      throw e;
    }
  } else {
    //If the order is not fulfilled, handle accordingly
    upsertSearchAttributes({ isOrderFailed: [true] });
    log.info('Order was not fulfilled. Not billing customer.');
  }
}
