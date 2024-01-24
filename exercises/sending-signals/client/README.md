## Exercise #1: Sending a Signal from the Client

This exercise shows how to send a Signal from just the Client and not from another Workflow.

In this part of the exercise, we have removed the `fulfillOrderWorkflow` Workflow, since this exercise is just for sending a Signal from a Client, and not from another Workflow.

We will skip the defining and handling of `fulfillOrderSignal` that were handled in `exercises/sending-signals/`. This exercise will solely focus on the Client file.

## Setup

You'll need two terminal windows for this exercise.

1. In all terminals, change to the `exercises/sending-signals/optional/practice` directory.
2. In one terminal, run `npm install` to install dependencies.

## Part A: Importing Your Signal

1. Edit the `client.ts` file to import `fulfillOrderSignal` from the `pizzaWorkflow`.
2. Save the file.

## Part B: Get a Handle on the Pizza Workflow

In this part of the exercise, you will create a handle on the Workflow that you wish to Signal, which is `pizzaWorkflow`.

1. Find the Workflow ID of `pizzaWorkflow` in the `client.ts` file.
2. Edit the `client.ts` file and use the `await client.workflow.getHandle` method to retrieve a handle of `pizzaWorkflow`.
2. Set the handle to a variable called `signalHandler`.
4. Save the file.

## Part C: Sending a Signal to the Pizza Workflow

Now that you have a handle on the Workflow you wish to Signal (`pizzaWorkflow`), we will now send `pizzaWorkflow` a Signal.

1. Edit the `client.ts` file.
2. Using the `signal` method and `signalHandler`, send the `pizzaWorkflow` the `fulfillOrderSignal` with the appropriate boolean to indicate that the order was successfully completed or not.
2. Save the file.

## Part D: Run Both Workflows

To run the Workflow:

1. In one terminal, start the Worker by running `npm start`.
2. In another terminal, start the Workflow by running `npm run workflow`.
3. You should see the following output in your CLI:

`{
  orderNumber: 'Z1238',
  confirmationNumber: 'AB9923',
  status: 'SUCCESS',
  billingTimestamp: 1706112388200,
  amount: 2700
}`.

### This is the end of the exercise.
