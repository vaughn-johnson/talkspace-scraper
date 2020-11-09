import axios from 'axios';
import logError from '../error/index.js';
import authenticate from './authenticate.js';

export const API_URL = 'https://www.talkspace.com/rest/ios/method/getAllRepliesForThread';

const scrapeMessages = async (authentication) => {
  try {
    // await is not supported as a default param
    const { token, roomID } = authentication || await authenticate();
    console.log(`Scraping the data for ${process.env.USERNAME} from Talkspace`);

    let body = {
      params: {
        tid: roomID,
        loadMediaURLs: true,
      },
    };

    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const messages = [];

    let res = await axios.post(API_URL, body, options);

    while (res.data['result '].messages.length > 0) {
      const { messages: newMessages } = res.data['result '];
      messages.push(...newMessages);

      // This is actually the minimum id, because we want prior messages
      const maxMessageId = newMessages.map((m) => m.message_id)
        .reduce((a, b) => (a < b ? a : b));
      body = { params: { ...body.params, maxMessageId } };

      // eslint-disable-next-line no-await-in-loop
      res = await axios.post(API_URL, body, options);
    }

    console.log(`Successfully scraped ${messages.length} messages`);
    return messages;
  } catch (e) {
    logError(`Failed get retrieve messages from ${API_URL}`);
    throw e;
  }
};

export default scrapeMessages;
