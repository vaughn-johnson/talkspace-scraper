import axios from 'axios';
import logError from '../error/index.js';

const AUTH_URL = 'https://clientapi.talkspace.com/v2/auth';
const API_URL = 'https://www.talkspace.com/rest/ios/method/getAllRepliesForThread';
const roomIdUrl = (userID) => `https://clientapi.talkspace.com/v2/clients/${userID}/rooms/last-messages`;

const authenticate = async () => {
  const body = { userType: 'CLIENT' };

  const encodedCreds = Buffer.from(`${process.env.USERNAME}:${process.env.PASSWORD}`, 'utf8')
    .toString('base64');
  const options = {
    headers: { Authorization: `Basic ${encodedCreds}` },
  };

  try {
    const res = await axios.post(AUTH_URL, body, options);
    const { userID, access: token } = res.data.data;
    return { userID, token };
  } catch (e) {
    logError(`Failed to authenticate from ${AUTH_URL}`);
    throw e;
  }
};

// TODO: Allow user to specificy particular room by therapist
// A Talkspace room is a set of messages between a client and therapist
const getRoomId = async (authentication) => {
  // await is not supported as a default param
  const { userID, token } = authentication || await authenticate();
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const res = await axios.get(roomIdUrl(userID), options);

    return res.data.data[0].roomId;
  } catch (e) {
    logError(`Failed get room id from ${roomIdUrl(userID)}`);
    throw e;
  }
};

const scrapeMessages = async (authentication) => {
  // await is not supported as a default param
  const { token } = authentication || await authenticate();
  console.log(`Scraping the data for ${process.env.USERNAME} from Talkspace`);

  const body = {
    params: {
      tid: await getRoomId(authentication),
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
