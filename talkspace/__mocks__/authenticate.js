const roomID = 42;
const token = 'open sesame';
const userID = 1;

const authenticate = jest.fn(async () => ({ userID, token, roomID }));

export default authenticate;
