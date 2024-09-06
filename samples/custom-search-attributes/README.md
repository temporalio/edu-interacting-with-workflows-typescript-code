# Custom Search Attributes

This example shows how custom Search Attributes can be used in your Workflow. This sample uses the `pizzaWorkflow`, and creates a custom Search Attribute called `isOrderFailed` which is a boolean. The user can then use this Search Attribute to query for Workflows where the pizza order has failed.

## Setup

You'll need two terminal windows for this sample.

1. In all terminals, change to the `/samples/custom-search-attributes/src` directory.
2. In one terminal, run `npm install` to install dependencies.

## Part A: Create a Custom Search Attribute

1. First, you will create your custom Search Attribute, `isOrderFailed`, to a boolean. You can do this in one of your terminals with the following command: `temporal operator search-attribute create --namespace default --name isOrderFailed --type bool`.
2. Make sure you can see all the Search Attributes you have with the command: `temporal operator search-attribute list`. You should now see `isOrderFailed` in this list. It may take up to ten seconds before the attribute appears.

## Part B: Upserting Attributes

Within the `pizzaWorkflow` code, we will now dynamically update Search Attributes using [`upsertSearchAttributes`](https://typescript.temporal.io/api/namespaces/workflow#upsertsearchattributes).

1. In `pizzaWorkflow.ts`, locate `upsertSearchAttributes({ isOrderFailed: [false] })` which is used to indicate that the order has not failed. It is marked not failed, because it is in the part of the logic when the Workflow has received the Signal that the order has been fulfilled.

2. In `pizzaWorkflow.ts`, locate `upsertSearchAttributes({ isOrderFailed: [true] })` which is used to indicate that the order has failed. It is marked failed in the part of the Workflow code when the Workflow has received the Signal that the order has not been fulfilled successfully.

## Part C: Querying Workflows by Search Attributes

Once you have Workflows tagged with Custom Search Attributes, you can query them based on these attributes.

In `client.ts`, we have:

```typescript
const iterator = await client.workflow.list({
  query: `isOrderFailed = true`,
});

for await (const workflow of iterator) {
  console.log('failed order', workflow.workflowId);
}
```

This lists all the Workflows that fulfill this query.

## Part D: Running Your Workflow

To run the Workflows:

1. In one terminal, start the Worker by running `npm start`.
2. In another terminal, start the Workflow by running `npm run workflow`.

In your console, you should see the Workflows that succeeded.

You can also send a query with your CLI: `temporal workflow list -q 'isOrderFailed=false'`.

### This is the end of the sample.