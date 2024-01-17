# Custom Search Attributes

This example provides an example of how custom search attributes can be used in your Workflow. This sample uses the `pizzaWorkflow`, creates a custom search attribute called `isOrderFailed` which is set to a boolean. The user can then use this search attribute to query for Workflows where the pizza order has failed.

## Setup

You'll need two terminal windows for this exercise.

1. In all terminals, change to the `exercises/samples/custom-search-attributes` directory
2. In one terminal, run `npm install` to install dependencies.

## Part A: Setting Your Custom Search Attribute

1. First, you will set your custom search attribute, `isOrderFailed`, which is set to a boolean. You can do this in one of your terminals with the following command: `temporal operator search-attribute create --namespace default --name isOrderFailed --type bool`.

2. You can also see all the search attributes you have with the command: `temporal operator search-attribute list`. You will now see `isOrderFailed` in this list.

3. In the `client.ts` file, we then set our custom search attribute by adding it to the options when starting a Workflow execution using (`WorkflowOptions.searchAttributes`)[https://typescript.temporal.io/api/interfaces/client.WorkflowOptions#searchattributes].

## Part B: Upserting Attributes

Within the `pizzaWorkflow` code, we will now dynamically update search attributes using [`upsertSearchAttributes`](https://typescript.temporal.io/api/namespaces/workflow#upsertsearchattributes).

1. In `pizzaWorkflow.ts`, we use `upsertSearchAttributes({ isOrderFailed: [false] })` to indicate that the order has not failed in the part of the logic when the Workflow has received the Signal that the order has been fulfilled.

2. We use `upsertSearchAttributes({ isOrderFailed: [true] })` in the part of the Workflow code when the Workflow has received the Signal that the order has not been fulfilled successfully.

## Part C: Querying Workflows by Search Attributes

Once you have Workflows tagged with custom search attributes, you can query them based on these attributes.

1. In `client.ts`, we have:

```typescript
const failedOrdersQuery = `isOrderFailed = true`;
const iterator = await client.workflow.list({
  query: failedOrdersQuery,
});

for await (const workflow of iterator) {
  console.log('failed order', workflow.workflowId);
}
```

## Part D: Running Your Workflows

To run the Workflows:

1. In one terminal, start the Worker by running `npm start`.
2. In another terminal, start the Workflow by running `npm run workflow`.

In your console, should see see the Workflows that succeeded.

### This is the end of the exercise.

If you'd like to see an optional exercise of sending a Signal from just the Client - not a Workflow - navigate to `exercises/sending-signals/optional/practice`.
