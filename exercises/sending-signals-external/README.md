## Exercise #2: Sending an External Signal

During this exercise, you will:
- Define and handle a Signal
- Retrieve a handle on the Workflow to Signal
- Send an external Signal
- Call both Workflows from the Client file

Make your changes to the code in the `practice` subdirectory (look for
`TODO` comments that will guide you to where you should make changes to
the code). If you need a hint or want to verify your changes, look at
the complete version in the `solution` subdirectory.

## Setup

You'll need two terminal windows for this exercise.

1. In all terminals, change to the `exercises/sending-signals-external/practice` directory.
2. In one terminal, run `npm install` to install dependencies.

## Part A: Defining a Signal

In this part of the exercise, you will define your Signal.

1. Edit the `pizzaWorkflow.ts` file.
2. Define your Signal by setting the `fulfillOrderSignal` variable to the Signal type provided: `pizzaOrderFulfilled`.
3. Save the file.

## Part B: Handling the Signal

You will now handle the Signal you defined in part A, and let the Workflow know what to do when it encounters the `fulfillOrderSignal`.

1. Note that in `pizzaWorkflow.ts`, we have a `signalProcessed` flag set to false. This indicates that `pizzaWorkflow` has not received a Signal just yet.
2. Now, edit the `pizzaWorkflow.ts` file to handle your Signal. We can see in the `setHandler` method that the `fulfillOrderSignal` is already partially handled. When a Workflow receives the `fulfillOrderSignal`, it will change the `isFulfilled` key in the `order` object to the boolean that it receives, indicating if the order was fulfilled or not.
3. Fill in the second part of this handler function by flipping the `signalProcessed` flag to indicate that the Signal has now been processed.
4. Note that after this `setHandler` method, the code uses `await condition` to waait for the `signal` to be received before continuing to the next step - billing the customer or returning an error.
5. Save the file.

## Part C: Create a Handle on the Pizza Workflow

The `fulfillOrderWorkflow` Workflow is used to fulfill an order (making and delivering Pizzas). If these steps are completed successfully, we want to use `fulfillOrderWorkflow` to signal to `pizzaWorkflow` that the order was complete and the customer can now be billed. Note that both `fulfillOrderWorkflow` and `pizzaWorkflow` take in the same input parameter: the order details.

In this part of the exercise, you will create a handle on the Workflow that you wish to Signal, which is `pizzaWorkflow`.

1. Edit the `fulfillOrderWorkflow.ts` file and use the `getExternalWorkflowHandle` method to retrieve a handle of `pizzaWorkflow` using its Workflow ID.
2. Find the Workflow ID of `pizzaWorkflow` in the `client.ts` file.
3. Fill out line 19 and set the `pizzaWorkflowHandle` variable to the handle of `pizzaWorkflow`.
4. Save the file.

## Part D: Signaling Your Workflow

Now that you have a handle on the Workflow you wish to Signal (`pizzaWorkflow`), we will now send `pizzaWorkflow` a Signal.

After you have created a handle, you can see there is some logic to make and deliver the pizzas. Once that is done successfully, we will now send our Signal.

1. Edit the `fulfillOrderWorkflow.ts` file and using `pizzaWorkflowHandle`, send the `fulfillOrderSignal`, using the appropriate boolean to indicate that the order was successfully completed.
2. In the `catch` part of this function, which indicates that there was something wrong with making or delivering the Pizzas, send the `fulfillOrderSignal`, using the appropriate boolean to indicate that the order has failed.
3. Save the file.

## Part E: Start the Workflow that Signals

We want to start both Workflows - `pizzaWorkflow` and `fulfillOrderSignal`.

1. Edit the `client.ts` file to start the `fulfillOrderSignal` Workflow using `client.workflow.start`.
2. Use the same argument and task queue as `pizzaWorkflowHandle`.
3. Set the Workflow ID to be `signal-fulfilled-order-${order.orderNumber}` or any other meaningful ID.
4. Save the file.

## Part F: Run Both Workflows

To run the Workflow:

1. In one terminal, start the Worker by running `npm start`.
2. In another terminal, start the Workflow by running `npm run workflow` which will run both `fulfillOrderSignal` and `pizzaWorkflow`.
3. You should see the following output in your CLI:

```typescript
{
  orderNumber: 'Z1238',
  confirmationNumber: 'AB9923',
  status: 'SUCCESS',
  billingTimestamp: 1706112388200,
  amount: 2700
}
```

### This is the end of the exercise.
