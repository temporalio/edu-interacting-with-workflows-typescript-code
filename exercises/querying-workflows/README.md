# Exercise #3: Querying Workflows

During this exercise, you will:

- Define and handle a Query
- Create a handle on a Workflow to be queried
- Call the Query from the Client
- Send a Query from the Command line

Make your changes to the code in the `practice` subdirectory (look for
`TODO` comments that will guide you to where you should make changes to
the code). If you need a hint or want to verify your changes, look at
the complete version in the `solution` subdirectory.

This exercise builds off of Exercise #2 (Sending a Signal from the Client), so it is recommended to first complete that exercise.

## Setup

You'll need two terminal windows for this exercise.

1. In all terminals, change to the `exercises/querying-workflows/practice` directory.
2. In one terminal, run `npm install` to install dependencies.

## Part A: Defining a Query

In this part of the exercise, you will define your Query.

1. Edit the `workflow.ts` file to define your Query. 
2. Fill in line 17 by setting the `orderStatusQuery` variable to the Query type provided: `orderStatusQuery`. This Query will provide information on the order status of the pizza order.
3. Save the file.

## Part B: Handling the Query

You will now handle the Query you defined in part A, and let the Workflow know what information to provide when it encounters the `orderStatusQuery`.

1. Edit the `workflow.ts` file to handle your Query. 
2. In the `setHandler` method, we already have `orderStatusQuery` passed in. This Query does not need to take in any arguments.
3. When a Workflow receives the `orderStatusQuery`, it should return the order status. The order status is a key on the `order` object which can be found in `shared.ts`.
4. Remove the placeholder return statement and fill in the rest of the function to return the value of the `orderStatus` key from the `PizzaOrder` object. 
5. Save the file.

## Part C: Call the Query on the pizzaWorkflowHandle

Now, we will call the `orderStatusQuery` from the Client.

1. In `client.ts`, call the `orderStatusQuery` with the `query` method on the `pizzaWorkflowHandle`. 
2. Assign the result of the Query call to a variable named `queryResult`.
3. Put a `console.log()` statement for `queryResult` so that when you run the Workflow, you can see the results of calling `orderStatusQuery`.
4. Save the file.

## Part D: Run the Workflow

To run the Workflow:

1. In one terminal, start the Worker by running `npm start`.
2. In another terminal, start the Workflow by running `npm run workflow`. You should see the Query results in this terminal window.
3. Locate this output in your console: `Preparing pizzas`.

## Part E: Sending a Signal to Your Workflow

1. We will now send a Signal to the pizza Workflow, signaling to it that the Pizza order is now complete.
2. In `workflows.ts`, uncomment lines 54-61, which are lines from the previous exercise which handle the Signal and wait for the Signal to be received before proceeding.
3. In `client.ts`, uncomment lines 22-23, which are lines to send `fullfillOrderSignal`. 

## Part F: Rerun the Workflow

To run the Workflow:

1. In one terminal, start the Worker by running `npm start`.
2. In another terminal, start the Workflow by running `npm run workflow`. You should see the query results in this terminal window.
3. Locate this output in your console: `Fulfilled`.

## Optional: Send a Query with the Command Line

To send a Query from the CLI, try the following:

```bash
temporal workflow query \
    --workflow-id="pizza-workflow-order-Z1238" \
    --type="orderStatusQuery" \
```

You should see this output in your CLI: `Query result:
["Fulfilled"].

### This is the end of the exercise.
