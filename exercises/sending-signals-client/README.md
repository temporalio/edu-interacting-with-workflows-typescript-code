## Exercise #1: Sending a Signal from the Client

This exercise shows how to send a Signal from just the Client and not from another Workflow.

During this exercise, you will:

- Define and handle a Signal
- Retrieve a handle on the Workflow to Signal
- Send a Signal from the Client

In this part of the exercise, we have removed the `fulfillOrderWorkflow` Workflow, since this exercise is just for sending a Signal from a Client, and not from another Workflow.

We will skip the defining and handling of `fulfillOrderSignal` that were handled in `exercises/sending-signals-external/`. This exercise will solely focus on the Client file.

## Setup

You'll need two terminal windows for this exercise.

1. In all terminals, change to the `exercises/sending-signals-client/practice` directory.
2. In one terminal, run `npm install` to install dependencies.

## Part A: Importing Your Signal

1. Edit the `client.ts` file to import `fulfillOrderSignal` from the `./workflow` file.
2. Save the file.

## Part B: Create a Handle on the Pizza Workflow

In this part of the exercise, you will create a handle on the Workflow that you wish to Signal, which is `pizzaWorkflow`.

1. Find the Workflow ID of `pizzaWorkflow` in the `client.ts` file.
2. Edit the `client.ts` file and use the `client.workflow.getHandle` method to retrieve a handle of `pizzaWorkflow`. Also, note that you could have simply used the `pizzaWorkflowExecution` handle to send the Signal and there isn't a need to get a handle first. However, we will get a handle in this case to demonstrate how to do this. You can see how to do this without creating a separate handle in the Query Workflows example.
2. Set the handle to a variable called `signalHandle`.
4. Save the file.

## Part C: Sending a Signal to the Pizza Workflow

Now that you have a handle on the Workflow you wish to Signal (`pizzaWorkflow`), we will now send `pizzaWorkflow` a Signal.

1. Edit the `client.ts` file.
2. Using the `signal` method and `signalHandle`, send the `pizzaWorkflow` the `fulfillOrderSignal` with the appropriate boolean to indicate that the order was successfully completed or not.
2. Save the file.

## Part D: Run the Workflow

To run the Workflow:

1. In one terminal, start the Worker by running `npm start`.
2. In another terminal, start the Workflow by running `npm run workflow`.
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
