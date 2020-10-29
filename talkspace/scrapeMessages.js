import axios from 'axios';
import logError from '../error/index.js';
import authenticate from './authenticate.js';

const API_URL = 'https://www.talkspace.com/rest/ios/method/getAllRepliesForThread';

const scrapeMessages = async (authentication) => {
  // await is not supported as a default param
  const { token, roomID } = authentication || await authenticate();
  console.log(`Scraping the data for ${process.env.USERNAME} from Talkspace`);

  const body = {
    params: {
      tid: roomID,
      lastMessageId: 0,
      limit: 2 ** 10, // TODO: guarantee scrape all messages
      loadMediaURLs: true,
    },
  };

  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const res = await axios.post(API_URL, body, options);
    const { messages } = res.data['result '];

    console.log(`Successfully scraped ${messages.length} messages`);
    return messages;
  } catch (e) {
    logError(`Failed get retrieve messages from ${API_URL}`);
    throw e;
  }
};

export default scrapeMessages;
