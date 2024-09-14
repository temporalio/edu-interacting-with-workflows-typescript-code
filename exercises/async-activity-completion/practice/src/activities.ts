import axios from 'axios';
import { CompleteAsyncError, activityInfo, log } from '@temporalio/activity';
import { AsyncCompletionClient } from '@temporalio/client';
import { TranslationActivityInput, TranslationActivityOutput } from './shared';

export async function translateTerm(input: TranslationActivityInput): Promise<TranslationActivityOutput> {
  // TODO Part A: Extract the task token and replace line 9 with it.
  // This can be done taking the `activityInfo` method below and chaining `taskToken` to it.
  const taskToken = '';

  log.info('Translating term:', { LanguageCode: input.languageCode, Term: input.term });

  // TODO PART B: Use setTimeout to asynchronously call `verifyAndCompleteTranslation`
  // after a one second delay.
  // verifyAndCompleteTranslation should take in task token from part A and the input passed in translateTerm.
  setTimeout(() => verifyAndCompleteTranslation('', ''), 1000);

  //TODO Part C: Replace the below line to throw CompleteAsyncError.
  throw new Error();
}

// Calling the URL in the `verifyAndCompleteTranslation` Activity
// will return a JSON-encoded map, with a single key:
// translation (containing the translated term). It currently
// supports the following languages
//
//    de: German
//    es: Spanish
//    fr: French
//    lv: Latvian
//    mi: Maori
//    sk: Slovak
//    tr: Turkish
//    zu: Zulu

async function verifyAndCompleteTranslation(taskToken: Uint8Array, input: TranslationActivityInput): Promise<void> {
  const lang = encodeURIComponent(input.languageCode);
  const term = encodeURIComponent(input.term);
  const url = `http://localhost:9998/translate?lang=${lang}&term=${term}`;

  try {
    const response = await axios.get(url);
    const translation = response.data;

    // TODO Part D: Call a new instance of `AsyncCompletionClient`
    // and set it to the client variable.
    const client = '';
    // TODO Call the `complete` method on `client` with await.
    // It should take in the task token as well as the translation variable.
  } catch (error: any) {
    if (error.response) {
      log.error('Translation request failed:', { status: error.response.status, data: error.response.data });
      throw new Error(`HTTP Error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      log.error('Translation request failed:', { request: error.request });
      throw new Error(`Request error:  ${error.request}`);
    }
    log.error('Something else failed during translation', { error });
    throw new Error('Something else failed during translation.');
  }
}
