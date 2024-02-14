# Exercise #3: Querying Workflows

During this exercise, you will:

- Define and handle a Query
- Create a handle to the Workflow the developer would like to query
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

1. Edit the `workflow.ts` file to define your Query. 
2. Fill in line 16 by setting the `orderDetailsQuery` variable to the Query type provided: `orderDetailsQuery`. This Query will provide information on the order details supplied into the Pizza Workflow.
3. Save the file.

## Part B: Handling the Query

You will now handle the Query you defined in part A, and let the Workflow know what information to provide when it encounters the `orderDetailsQuery`.

1. Edit the `workflow.ts` file to handle your Query. 
2. In the `setHandler` method, we already have `orderDetailsQuery` passed in. This query will take in a key from the `PizzaOrder` object.
3. When a Workflow receives the `orderDetailsQuery` along with the key it wants a value of (e.g., address), it should return the value of the input key. Locate the details of the shape of the `order` object are in `shared.ts`.
4. Remove the placeholder return statement and fill in the rest of the function to return the value of the `orderNumber` key from the `PizzaOrder` object. 
5. Don't forget to `JSON.stringify()` the response, because some of the values on the `order` object are JSON.
6. Save the file.

## Part C: Create a Handle on the Workflow to Query

We want to call the `orderDetailsQuery` from the Client. After importing the Query, we need to create a handle.

1. Edit the `client.ts` file to call the `orderDetailsQuery`. 
2. Import your Query.
2. Now you will create a handle on the Workflow that you wish to Query, which is `pizzaWorkflow`. 
3. You will set the handle to the variable `queryHandler`.
4. Save the file.

## Part D: Call the Query from the Client

Now, we will call the `orderDetailsQuery` from the Client.

1. In `client.ts`, call the `orderDetailsQuery` with the `query` method. 
2. Assign the result of the Query call to a variable named `queryResult`.
3. In the `query` method, pass in a key from the `PizzaOrder` that you want to get the information of (e.g., `orderNumber`, `customer`, `items` etc.) The PizzaOrder object details are in `shared.ts`.
4. Put a `console.log()` statement for `queryResult` so that when you run the Workflow, you can see the results of calling `orderDetailsQuery`.
5. Save the file.

## Part E: Run Both Workflows

To run the Workflow:

1. In one terminal, start the Worker by running `npm start`.
2. In another terminal, start the Workflow by running `npm run workflow`. You should see the query results in this terminal window.
3. Locate this output in your CLI: `query result: {"customerID":12983,"name":"María García","email":"maria1985@example.com","phone":"415-555-7418"}`.

## Optional: Send a Query with the Command Line

To send a Query from the CLI, try the following:

```bash
temporal workflow query \
    --workflow-id="pizza-workflow-order-Z1238" \
    --type="orderDetailsQuery" \
    --input='"orderNumber"'
```

You should see this output in your CLI: `Query result:
["\"Z1238\""]`.

### This is the end of the exercise.
