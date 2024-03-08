import { proxyActivities, getExternalWorkflowHandle, upsertSearchAttributes } from '@temporalio/workflow';
import { fulfillOrderSignal } from './pizzaWorkflow';
import type * as activities from '../activities';
import { PizzaOrder } from '../shared';

const { makePizzas, deliverPizzas } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: {
    maximumInterval: '10 seconds',
  },
});

export async function fulfillOrderWorkflow(order: PizzaOrder) {
  const pizzaWorkflowHandle = getExternalWorkflowHandle(`pizza-workflow-order-${order.orderNumber}`);
  try {
    // Logic to fulfill the order
    await makePizzas(order);
    upsertSearchAttributes({ orderStatus: ["PREPARED"] });
    await deliverPizzas(order);
    upsertSearchAttributes({ orderStatus: ["DELIVERED"] });
    // Signal the pizzaWorkflow that the order is fulfilled successfully
    await pizzaWorkflowHandle.signal(fulfillOrderSignal, true);
    upsertSearchAttributes({ orderStatus: ["FULFILLED"] });
    return 'order fulfilled';
  } catch (error) {
    // Signal the pizzaWorkflow that the order fulfillment failed
    await pizzaWorkflowHandle.signal(fulfillOrderSignal, false);
    upsertSearchAttributes({ orderStatus: ["FAILED"] });
    return 'order not fulfilled';
  }
}
