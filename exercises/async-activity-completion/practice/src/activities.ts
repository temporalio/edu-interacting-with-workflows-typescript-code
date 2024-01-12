import axios from 'axios';
import * as activity from '@temporalio/activity';
import { CompleteAsyncError } from "@temporalio/activity";
import { AsyncCompletionClient } from "@temporalio/client";

import { TranslationActivityInput, TranslationActivityOutput } from './shared';

export async function translateTerm(input: TranslationActivityInput): Promise<TranslationActivityOutput> {
  const context = activity.Context.current();
  //TODO Part A: Extract the task token and replace line 13 with it.
  //This can be done using the context variable above, which is defined as:
  // const context = {info: {taskToken: 'abc'}}
  const taskToken = new Uint8Array(2);

  context.log.info('Translating term:', { LanguageCode: input.languageCode, Term: input.term });

  //TODO PART B: Use setTimeout to asynchronously call `startTranslation` after a one second delay.
  //startTranslation should take in task token from part A and the input passed in translateTerm.
  setTimeout(() => {});

  //TODO Part C: Replace the below line to throw CompleteAsyncError
  throw new Error();
}

async function startTranslation(taskToken: Uint8Array, input: TranslationActivityInput): Promise<void> {
  const context = activity.Context.current();
  const lang = encodeURIComponent(input.languageCode);
  const term = encodeURIComponent(input.term);
  const url = `http://localhost:9998/translate?lang=${lang}&term=${term}`;

  try {
    const response = await axios.get(url);
    const content = response.data;

    // TODO Part D: Call the `completeTranslation` function 
    // This function should take in the task token and the data received from the translation service
  } catch (error: any) {
    if (error.response) {
      context.log.error('Translation request failed:', { status: error.response.status, data: error.response.data });
      throw new Error(`HTTP Error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      context.log.error('Translation request failed:', { request: error.request });
      throw new Error(`Request error:  ${error.request}`);
    }
    context.log.error('Something else failed during translation', { error });
    throw new Error('Something else failed during translation.');
  }
}

async function completeTranslation(taskToken: Uint8Array, translation: string): Promise<void> {
  //TODO Part E: Call a new instance of `AsyncCompletionClient` and set it to the client variable.
  const client = '';
  //TODO Call the `complete` method on `client`. It should take in the task token as well as the results of the translation in an object, like {translation}.
}