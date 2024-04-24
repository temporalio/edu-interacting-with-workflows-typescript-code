import { proxyActivities, getExternalWorkflowHandle } from '@temporalio/workflow';
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
  // TODO Part C: Use getExternalWorkflowHandle to create
  // a handle to the pizzaWorkflow Workflow ID.
  // The Workflow ID can be found in the client.ts file.
  // An example of how to do this is below:
  // const exampleHandle = getExternalWorkflowHandle(`workflow-id-to-signal`);
  const pizzaWorkflowHandle = '';
  try {
    await makePizzas(order);
    await deliverPizzas(order);
    // TODO Part D: Signal the pizzaWorkflow that the order is 
    // fulfilled successfully by using fulfillOrderSignal along 
    // with true to signal that the order was fulfilled successfully
    // An example of how to do this is below:
    // await exampleHandle.signal(exampleSignal, \"myInput\");
    return 'order fulfilled';
  } catch (error) {
    // TODO Part D: Signal the pizzaWorkflow that the order failed 
    // by using the fulfillOrderSignal and false 
    // to signal that the order was not done successfully
    return 'order not fulfilled';
  }
}
