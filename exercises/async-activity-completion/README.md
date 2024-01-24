# Exercise 4: Asynchronous Activity Completion

During this exercise, you will:

- Retrieve a task token from your Activity execution
- Learn to structure asynchronous Activities
- Throw a `CompleteAsyncError` to indicate that the Activity is waiting for an external completion.using
- Use `AsyncCompletionClient` to communicate the result of the asynchronous Activity back to the Workflow

Make your changes to the code in the `practice` subdirectory (look for `TODO` comments that will guide you to where you should make changes to the code). If you need a hint or want to verify your changes, look at the complete version in the `solution` subdirectory.

## Setup

You'll need three terminal windows for this exercise.

1. In all terminals, change to the `exercises/async-activity-completion/practice` directory.
2. In one terminal, run `npm install` to install dependencies.

## Explanation of Scenario

You have three functions in the Activities file: `translateTerm`, `startTranslation`, `completeTranslation`. The purpose of the Activities are described as the following:

- `translateTerm` will be used to extract the Task Token and initiate the translation task. Since the translation task (`startTranslation`) is calling an external service, let's pretend it takes more time than it actually does. Therefore, this Activity will make the Worker forget about the `startTranslation` Activity, signaling to the Worker that this task will be completed later.

- `startTranslation`, which is scheduled to run after a short delay, performs the actual translation task.

- `completeTranslation` is responsible for signaling the completion of the Activity to Temporal and provide the final translation back to Temporal.

## Part A: Retrieve the task token

1. In the `activities.ts` file, extract the task token, which is unique identifier for the Activity Task Execution.
2. Replace line 13 with your `taskToken` variable.

## Part B: Schedule your Activity to Run Asynchronously

1. Using `setTimeout`, schedule your function `startTranslation` to run asynchronously after a one second delay. 
2. Your `startTranslation` function should take in the task token you defined in part A, as well as the input that is passed into the `translateTerm` function.

## Part C: Throw `CompleteAsyncError`

Throw a new `CompleteAsyncError` to make the Worker forget about `startTranslation` Activity and to signify that `startTranslation` is waiting for an external completion.

## Part D: Call `completeTranslation` Function

We will now move to the next function in the `activities.ts` file: `startTranslation`. This is the function that is running asynchronously since it needs to take some time to call the translation service. This is a stand-in for a more complex scenario where the actual work might happen outside of the Temporal service. After it receives the data from the translation service, we want to call `completeTranslation`.

1. In the `startTranslation` function, call the `completeTranslation` function.
2. Pass in the task token and the data that we received from the translation service.

## Part E: Use `AsyncCompletionClient` to Communicate Result Back to Temporal

We will now move to the final function: `completeTranslation`. This is the function that will communicate the result of the asynchronous Activity - `startTranslation` - back to Temporal.

1. In the `completeTranslation` function, instantiate a new instance of `AsyncCompletionClient` and set it to the `client` variable.
2. Using `AsyncCompletionClient`, call its `complete` method in order to asynchronously communicate the result of `startTranslation` back to Temporal. 
3. The complete method should take in the task token along with the results from `startTranslation`. 
4. The results should be in an object with the string 'translation' as the key and the results of the translation as the value.
5. Save the `activities.ts` file.

## Part F: Running the Workflow

To run the `sayHelloGoodbyeWorkflow` Workflow:

In each terminal, ensure you are in the `exercises/async-activity-completion/practice` directory.

1. In one terminal, start the translation microservice by running `npm run service`.
2. In another terminal, start the Worker by running `npm start`.
3. In another terminal, execute the Workflow by running `npm run workflow Tatiana sk` (replace `Tatiana` with your first name).

After the final step, you should see the translated Hello and Goodbye messages, which confirms that Workflow Execution completed successfully.

### This is the end of the exercise.
