# Exercise 4: Asynchronous Activity Completion

During this exercise, you will:

- Retrieve a task token from your Activity execution
- Throw a `CompleteAsyncError` to indicate that the Activity is waiting for an external completion
- Use `AsyncCompletionClient` to communicate the result of the asynchronous Activity back to the Workflow

Make your changes to the code in the `practice` subdirectory (look for `TODO` comments that will guide you to where you should make changes to the code). If you need a hint or want to verify your changes, look at the complete version in the `solution` subdirectory.

## Setup

You'll need three terminal windows for this exercise.

1. In all terminals, change to the `exercises/async-activity-completion/practice` directory.
2. In one terminal, run `npm install` to install dependencies.

## Explanation of Scenario

You have two functions in the Activities file: `translateTerm` and `verifyAndCompleteTranslation`. The purpose of the Activities are described as the following:

- `translateTerm` will be used to extract the Task Token and initiate the translation task. Since the translation task (`verifyAndCompleteTranslation`) is calling an external service, let's pretend it takes more time than it actually does. Therefore, `translateTerm` will make the Worker forget about the `verifyAndCompleteTranslation` Activity, signaling to the Worker that this task will be completed later.

- `verifyAndCompleteTranslation` performs the actual translation task. It then signals the completion of the Activity to Temporal and provide the final translation back to Temporal.

## Part A: Retrieve the task token

1. In the `activities.ts` file, extract the task token, which is unique identifier for the Activity Task Execution.   This can be done like so: `const token = activityInfo().taskToken`.
2. Replace line 9 with your `taskToken` variable.

## Part B: Schedule your Activity to Run Asynchronously

1. Using `setTimeout`, schedule your function `verifyAndCompleteTranslation` to run asynchronously after a one second delay.
2. Pass the task token you defined in part A and the input that is passed into the `translateTerm` function into your `verifyAndCompleteTranslation` function

## Part C: Throw `CompleteAsyncError`

Throw a new `CompleteAsyncError` to make the Worker forget about the `translateTerm` Activity and to signify that `translateTerm` is waiting for an external completion.

## Part D: Use `AsyncCompletionClient` to Communicate Result Back to Temporal

We will now move to the next Activity: `verifyAndCompleteTranslation`. This is the Activity that will communicate the results back to Temporal.

1. In the `verifyAndCompleteTranslation` function, instantiate a new instance of `AsyncCompletionClient` and set it to the `client` variable.
2. Using `AsyncCompletionClient`, call its `complete` method with `await` in order to asynchronously communicate the result of `verifyAndCompleteTranslation` back to Temporal. It should take in the task token as well as the `translation` variable.
3. Save the `activities.ts` file.

## Part F: Running the Workflow

To run the `sayHelloWorkflow` Workflow:

In each terminal, ensure you are in the `exercises/async-activity-completion/practice` directory.

1. In one terminal, start the translation microservice by running `npm run service`.
2. In another terminal, start the Worker by running `npm start`.
3. In another terminal, execute the Workflow by running `npm run workflow Tatiana sk` (replace `Tatiana` with your first name).

After the final step, you should see the translated Hello message, which confirms that Workflow Execution completed successfully.

### This is the end of the exercise.
