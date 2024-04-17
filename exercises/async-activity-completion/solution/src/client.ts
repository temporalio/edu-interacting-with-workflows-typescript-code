import { Connection, Client } from '@temporalio/client';
import { sayHelloWorkflow } from './workflows';

import { TASK_QUEUE_NAME } from './shared';

async function run() {
  if (process.argv.length <= 3) {
    console.error('Must specify a name and language code as the command-line arguments');
    process.exit(1);
  }

  const name = process.argv[2];
  const languageCode = process.argv[3];
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({ connection });

  const input = {
    name,
    languageCode,
  };

  const handle = await client.workflow.start(sayHelloWorkflow, {
    // type inference works! args: [name: string]
    args: [input],
    taskQueue: TASK_QUEUE_NAME,
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'translation-workflow-' + input.name,
  });

  console.log(`Started workflow ${handle.workflowId}`);

  const output = await handle.result();

  console.log(output);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
