import axios from 'axios';
import logError from '../error/index.js';

export const AUTH_URL = 'https://clientapi.talkspace.com/v2/auth';

// TODO: Allow user to specificy particular room by therapist
// A Talkspace room is a set of messages between a client and therapist
const getRoomId = async (userID, token) => {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const res = await axios.get(
      `https://clientapi.talkspace.com/v2/clients/${userID}/rooms/last-messages`,
      options,
    );

    return res.data.data[0].roomId;
  } catch (e) {
    logError('Failed get room id');
    throw e;
  }
};

const authenticate = async (username = process.env.USERNAME, password = process.env.PASSWORD) => {
  const body = { userType: 'CLIENT' };
  const userPass = `${username}:${password}`;
  const encodedCreds = Buffer.from(userPass, 'utf8').toString('base64');

  const options = {
    headers: { Authorization: `Basic ${encodedCreds}` },
  };

  try {
    const res = await axios.post(AUTH_URL, body, options);
    const { userID, access: token } = res.data.data;
    const roomID = await getRoomId(userID, token);

    return { userID, roomID, token };
  } catch (e) {
    logError(
      `Failed to authenticate from ${AUTH_URL}\n`
      + `with user:pass ${username}:${password}`,
    );
    throw e;
  }
};

export default authenticate;
