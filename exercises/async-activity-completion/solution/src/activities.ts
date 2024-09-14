import axios from 'axios';
import { CompleteAsyncError, activityInfo, log } from '@temporalio/activity';
import { AsyncCompletionClient } from '@temporalio/client';
import { TranslationActivityInput, TranslationActivityOutput } from './shared';

export async function translateTerm(input: TranslationActivityInput): Promise<TranslationActivityOutput> {
  const taskToken = activityInfo().taskToken;

  log.info('Translating term:', { LanguageCode: input.languageCode, Term: input.term });

  setTimeout(() => verifyAndCompleteTranslation(taskToken, input), 1000);
  throw new CompleteAsyncError();
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
    const client = new AsyncCompletionClient();
    await client.complete(taskToken, translation);
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
