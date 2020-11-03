import { scrapeMessages, authenticate} from './talkspace/index.js';
import saveMessagesToDB from './mongo/index.js';
import logError from './error/index.js';

export default {
 scrapeMessages,
  authenticate,
  saveMessagesToDB,
  logError 
}
