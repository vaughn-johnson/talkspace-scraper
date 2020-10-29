import axios from 'axios';

jest.mock('axios');
jest.mock('../error/index.js');

describe('scrapeMessages', () => {
  describe('happy path', () => {
    it('returns messages', () => {});

    it('only calls authenticate once', () => {});
  });

  describe('API failure', () => {
    describe('authentication failure', () => {
      it('tells the user', () => {});

      it('raises an error', () => {});
    });
  });
});
