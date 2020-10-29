import axios from 'axios';

jest.mock('axios');
jest.mock('../error/index.js');

describe('authenticate', () => {
  describe('happy path', () => {
    it('returns userID, token, and roomID', () => {});

    it('only hits /auth once', () => {});
  });

  describe('API failure', () => {
    describe('auth failure', () => {
      it('tells the user', () => {});

      it('raises an error', () => {});
    });

    describe('room number failure', () => {
      it('tells the user', () => {});

      it('raises an error', () => {});
    });
  });
});
