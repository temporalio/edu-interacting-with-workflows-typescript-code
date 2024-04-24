import { Connection, Client } from '@temporalio/client';
import { pizzaWorkflow, fulfillOrderWorkflow } from './workflows/all-workflows';
import { Address, Customer, Pizza, PizzaOrder, TASK_QUEUE_NAME } from './shared';

async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({
    connection,
  });

  const order = createPizzaOrder();

  const pizzaWorkflowHandle = await client.workflow.start(pizzaWorkflow, {
    args: [order],
    taskQueue: TASK_QUEUE_NAME,
    workflowId: `pizza-workflow-order-${order.orderNumber}`,
    searchAttributes: {
      orderStatus: ['CREATED']
    },
  });

  const fulfillOrderHandle = await client.workflow.start(fulfillOrderWorkflow, {
    args: [order],
    taskQueue: TASK_QUEUE_NAME,
    workflowId: `signal-fulfilled-order-${order.orderNumber}`,
  });

  // optional: wait for client result
  console.log(await pizzaWorkflowHandle.result());

  const iterator = await client.workflow.list({
    query: `isOrderFailed = false`,
  });

  for await (const workflow of iterator) {
    console.log('Successful order:', workflow.workflowId);
  }
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
