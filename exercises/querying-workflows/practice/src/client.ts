import { Connection, Client } from '@temporalio/client';
import { pizzaWorkflow, orderStatusQuery, fulfillOrderSignal } from './workflow';
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
  });

  // TODO Part E: Send the `pizzaWorkflowHandle` the `fulfillOrderSignal` with `true`.

  // optional: wait for client result
  console.log(await pizzaWorkflowHandle.result());

  // TODO Part C: Call the `orderStatusQuery` with the `query` method on `pizzaWorkflowHandle`.
  // Set it to a variable called queryResult.
  // An example of this is below:
  // const exampleQuery = await exampleHandle.query(myQuery)
  const queryResult = '';

  // TODO Set a console.log statement to the result of queryResult.
  // so that you can see the result of your query.
  console.log();
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
    orderStatus: 'Created',
  };

  return order;
}
