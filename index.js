import axios from 'axios';

const authenticate = async () => {
  const body = { userType: 'CLIENT' };

  const encodedCreds = Buffer.from(`${process.env.USERNAME}:${process.env.PASSWORD}`, 'utf8')
                         .toString('base64')
  const options = {
    headers: { Authorization: `Basic ${encodedCreds}` }
  };

  const res = await axios.post(process.env.AUTH_URL, body, options);
  const { userID, access: token } = res.data.data;
  return { userID, token };
};

// TODO: Allow user to specificy particular room
const getRoomId = async (userID, token) => {
  const url = `https://clientapi.talkspace.com/v2/clients/${userID}/rooms/last-messages`;
  const options = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const res = await axios.get(url, options);

  return res.data.data[0].roomId;
};

const scrapeMessages = async () => {
  console.log(`Scraping the data for ${process.env.USERNAME} from Talkspace`);
  const { userID, token } = await authenticate();

  const body = {
    params: {
      "tid": await getRoomId(userID, token),
      "lastMessageId": 0,
      "limit": 2 ** 10, // TODO: guarantee scrape all messages
      "loadMediaURLs": true
    }
  };

  const options = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const res = await axios.post(process.env.API_URL, body, options)

  return res.data['result '].messages;
};

console.log(await scrapeMessages());