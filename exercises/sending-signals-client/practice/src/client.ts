import { Connection, Client } from '@temporalio/client';
//TODO Part A: Import `fulfillOrderSignal`.
import { pizzaWorkflow } from './workflow';
import { Address, Customer, Pizza, PizzaOrder, TASK_QUEUE_NAME } from './shared';

async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({
    connection,
  });

  const order = createPizzaOrder();

  const pizzaWorkflowExecution = await client.workflow.start(pizzaWorkflow, {
    args: [order],
    taskQueue: TASK_QUEUE_NAME,
    workflowId: `pizza-workflow-order-${order.orderNumber}`,
  });

  // TODO Part B: Create a handle on the pizzaWorkflowExecution 
  // using `await client.Workflow.getHandle` and its Workflow ID.
  // Set the handle to a variable called signalHandler.
  const signalHandler = '';

  // TODO Part C: Using the `signal` method and signalHandler, 
  // send the `pizzaWorkflow` the `fulfillOrderSignal` with the appropriate boolean 
  // to indicate that the order was successfully completed or not.
  // An example of this is below:
  // await exampleHandler.signal(exampleSignal, 'input');

  // optional: wait for client result
  console.log(await pizzaWorkflowExecution.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

function createPizzaOrder(): PizzaOrder {
  const customer: Customer = {
    customerID: 12983,
    name: 'María García',
    email: 'maria1985@example.com',
    phone: '415-555-7418',
  };

  const address: Address = {
    line1: '701 Mission Street',
    line2: 'Apartment 9C',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94103',
  };

  const p1: Pizza = {
    description: 'Large, with mushrooms and onions',
    price: 1500,
  };

  const p2: Pizza = {
    description: 'Small, with pepperoni',
    price: 1200,
  };

  const items: Pizza[] = [p1, p2];

  const order: PizzaOrder = {
    orderNumber: 'Z1238',
    customer,
    items,
    address,
    isDelivery: true,
    isFulfilled: false,
  };

  return order;
}
