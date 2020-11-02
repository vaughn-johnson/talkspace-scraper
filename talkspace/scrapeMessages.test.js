import 'regenerator-runtime/runtime';
import axios from 'axios';
import scrapeMessages from './scrapeMessages.js';
import authenticate from './authenticate.js';
import logError from '../error/index.js';

jest.mock('axios');
jest.mock('./authenticate.js');
jest.mock('../error/index.js');

const messages = 'I wanted electricity to go everywhere in the world'.split(' ').map((m) => ({ m }));
const error = { message: 'whoops', code: 500 };

describe('scrapeMessages', () => {
  beforeEach(() => {
    // jest hoists jest.mock, so we lose the other imported modules
    /* eslint-disable  global-require */
    const { API_URL } = require('./scrapeMessages.js');

    axios.post.mockImplementation((endpoint) => {
      if (endpoint === API_URL) {
        return {
          data: {
            'result ': { messages },
          },
        };
      }

      return {};
    });
  });

  describe('happy path', () => {
    it('returns messages', async () => {
      expect.assertions(1);

      expect(await scrapeMessages())
        .toEqual(messages);
    });

    it('only calls authenticate once', async () => {
      expect.assertions(1);

      await scrapeMessages();
      expect(authenticate).toHaveBeenCalledTimes(1);
    });
  });

  describe('API failure', () => {
    describe('authentication failure', () => {
      beforeEach(() => {
        authenticate.mockRejectedValue(error);
      });

      it('fails and tells the user', async () => {
        expect.assertions(1);

        try {
          await scrapeMessages();
        } catch (e) {
          expect(logError).toHaveBeenCalled();
        }
      });
    });

    describe('message query failure', () => {
      beforeEach(() => {
        axios.post.mockRejectedValue(error);
      });

      it('fails and tells the user', async () => {
        expect.assertions(1);

        try {
          await scrapeMessages();
        } catch (e) {
          expect(logError).toHaveBeenCalled();
        }
      });
    });
  });
});
