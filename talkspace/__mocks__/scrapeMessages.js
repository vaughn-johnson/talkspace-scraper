const messages = 'nobody,not even the rain,has such small hands'.split(' ').map((m) => ({ m }));
const scrapeMessages = jest.fn(() => messages);
export default scrapeMessages;
