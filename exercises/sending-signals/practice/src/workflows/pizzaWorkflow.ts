import { condition, proxyActivities, log, defineSignal, setHandler, sleep } from '@temporalio/workflow';
import { ApplicationFailure } from '@temporalio/common';
import type * as activities from '../activities';
import { Distance, OrderConfirmation, PizzaOrder } from '../shared';

const { sendBill, getDistance } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: {
    maximumInterval: '10 seconds',
  },
});

// TODO Part A: Use defineSignal to define a Signal which we will call fulfillOrderSignal.
// Fill in the Signal type, which should be 'pizzaOrderFulfilled'.
export const fulfillOrderSignal = defineSignal<[boolean]>('');

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
      throw new ApplicationFailure('Customer lives too far away for delivery');
    }
  }

  for (const pizza of order.items) {
    totalPrice += pizza.price;
  }

  setHandler(fulfillOrderSignal, (isOrderFulfilled) => {
    order.isFulfilled = isOrderFulfilled;
    // TODO Part B: Use setHandler to let the Workflow know what happens if it receives a fulfillOrderSignal.
    // Flip the signalProcessed flag in this handler to let the Workflow know that the signal has been processed
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
      return await sendBill(bill);
    } catch (e) {
      log.error('Unable to bill customer', {});
      throw e;
    }
  } else {
    //If the order is not fulfilled, handle accordingly
    log.info('Order was not fulfilled. Not billing customer.');
  }
}
