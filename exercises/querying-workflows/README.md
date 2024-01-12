# Exercise #2: Querying Workflows

During this exercise, you will:

- Define and handle a Query
- Get a handle on the Workflow the developer would like to query
- Call the Query from the Client
- Send a Query from the Command line

Make your changes to the code in the `practice` subdirectory (look for
`TODO` comments that will guide you to where you should make changes to
the code). If you need a hint or want to verify your changes, look at
the complete version in the `solution` subdirectory.

## Setup

You'll need two terminal windows for this exercise.

1. In all terminals, change to the `exercises/querying-workflows/practice` directory.
2. In one terminal, run `npm install` to install dependencies.

## Part A: Defining a Query

In this part of the exercise, you will define your Query.

1. Edit the `workflow.ts` file to define your Query. To do this, fill in line 15 by setting the `orderDetailsQuery` variable to the Query type provided: `orderDetailsQuery`. This Query will provide information on the order details supplied into the Pizza Workflow.

The details of the shape of the `order` object are in `shared.ts`.

## Part B: Handling the Query

You will now handle the Query you defined in part A, and let the Workflow know what information to provide when it encounters the `orderDetailsQuery`.

1. Edit the `workflow.ts` file to handle your Query. In the `setHandler` method, we already have `orderDetailsQuery` passed in. This query will take in a key from the `PizzaOrder` object.

When a Workflow receives the `orderDetailsQuery` along with the key it wants a value of (e.g., address), it should return the value of the input key.

Remove the placeholder return statement and fill in the rest of the function to return the value of the key from the `PizzaOrder` object. Don't forget to `JSON.stringify()` the response, because some of the values on the `order` object are JSON.

## Part C: Create a handle on the Workflow to Query

We want to call the `orderDetailsQuery` from the Client. After importing the Query, we need to create a handle.

1. Edit the `client.ts` file to call the `orderDetailsQuery`. First, import your Query.
2. Now you will create a handle on the Workflow that you wish to Query, which is `pizzaWorkflow`. You will set the handle to the variable `queryHandler`.

## Part D: Call the Query from the Client

Now, we will call the `orderDetailsQuery` from the Client.

1. In `client.ts`, call the `orderDetailsQuery` with the `query` method. Set the `query` call to a variable called `queryResult`. In the `query` method, pass in a key from the `PizzaOrder` that you want to get the information of (e.g., `orderNumber`, `customer`, `items` etc.) The PizzaOrder object details are in `shared.ts`.

2. Put a `console.log()` statement for `queryResult` so that when you run the Workflow, you can see the results of calling `orderDetailsQuery`.

## Part E: Run Both Workflows

To run the Workflow:

1. In one terminal, start the Worker by running `npm start`.
2. In another terminal, start the Workflow by running `npm run workflow`. You should see the query results in this terminal window.

## Optional: Send a Query with the Command Line.

To send a Query from the CLI, try the following:

```
temporal workflow query \
--workflow-id="pizza-workflow-order-Z1238" \
--type="orderDetailsQuery" \
--input=\"orderNumber\"
```

### This is the end of the exercise.
