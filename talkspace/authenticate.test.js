import 'regenerator-runtime/runtime';
import { expect } from '@jest/globals';
import axios from 'axios';
import logError from '../error/index.js';
import authenicate from './authenticate.js';

jest.mock('axios');
jest.mock('../error/index.js');

beforeEach(() => {
  axios.mockClear();
});

const error = { error: 'whoops', code: 500 };

describe('authenticate', () => {
  beforeEach(() => {
    // jest hoists jest.mock, so we lose the other imported modules
    /* eslint-disable  global-require */
    const { AUTH_URL } = require('./authenticate.js');

    axios.post.mockImplementation((endpoint) => {
      if (endpoint === AUTH_URL) {
        return {
          data: {
            data: {
              userID: 42,
              access: 'token',
            },
          },
        };
      }

      return {};
    });

    axios.get.mockImplementation((endpoint) => {
      if (endpoint.match(/rooms\/last-messages/)) {
        return {
          data: {
            data: [{
              roomId: 42,
            }],
          },
        };
      }

      return {};
    });
  });

  describe('happy path', () => {
    it('returns userID, token, and roomID', async () => {
      expect.assertions(1);

      expect(await authenicate()).toEqual(
        expect.objectContaining({
          userID: expect.anything(),
          token: expect.anything(),
          roomID: expect.anything(),
        }),
      );
    });

    it('only hits /auth once', async () => {
      expect.assertions(1);

      await authenicate();
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('API failure', () => {
    describe('auth failure', () => {
      beforeEach(() => {
        axios.post.mockRejectedValue(error);
      });

      it('fails and tells the user', async () => {
        expect.assertions(1);

        try {
          await authenicate();
        } catch (e) {
          expect(logError).toHaveBeenCalled();
        }
      });
    });

    describe('room number failure', () => {
      beforeEach(() => {
        axios.post.mockRejectedValue(error);
      });

      it('fails and tells the user', async () => {
        expect.assertions(1);

        try {
          await authenicate();
        } catch (e) {
          expect(logError).toHaveBeenCalled();
        }
      });
    });
  });
});
