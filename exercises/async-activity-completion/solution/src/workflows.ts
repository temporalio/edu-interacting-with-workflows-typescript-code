import { proxyActivities, log } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { TranslationWorkflowInput, TranslationWorkflowOutput } from './shared';

const { translateTerm } = proxyActivities<typeof activities>({
  startToCloseTimeout: '45 seconds',
});

export async function sayHelloWorkflow(input: TranslationWorkflowInput): Promise<TranslationWorkflowOutput> {
  log.info('SayHello Workflow Invoked', { Name: input.name });

  log.debug('Preparing to translate "Hello"', { LanguageCode: input.languageCode });

  const helloInput = {
    term: 'Hello',
    languageCode: input.languageCode,
  };

  const helloTranslation = await translateTerm(helloInput);
  const helloMessage = `${helloTranslation}, ${input.name}`;

  return { helloMessage };
}
