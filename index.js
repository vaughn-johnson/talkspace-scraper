/* eslint-disable */

//  I am using top-level await, which is in stage three proposal
// Unfortunately, ESLint only supports stage four proposals

import scrapeMessages from './talkspace/index.js';
import saveMessagesToDB from './mongo/index.js';
import logError from './error/index.js';

const args = process.argv.slice(2);

const overwrite = args ? args[0] === '-overwrite' : false

try {
  const messages = await scrapeMessages();
  await saveMessagesToDB(messages, overwrite);
} catch (e) {
  logError(`Did not succeed: ${e.message}`);
}
