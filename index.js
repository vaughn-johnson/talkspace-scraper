import axios from 'axios';
console.log(`Scraping the data for ${process.env.USERNAME} from Talkspace`);


const authenticate = async () => {
  const body = { userType: 'CLIENT' };

  const token = Buffer.from(`${process.env.USERNAME}:${process.env.PASSWORD}`, 'utf8')
                  .toString('base64')
  const options = {
    headers: { Authorization: `Basic ${token}` }
  };

  return await axios.post(process.env.AUTH_URL, body, options);
};

console.log((await authenticate()).data);