import 'regenerator-runtime/runtime';
import saveMessagesToDB from './index.js';
import {
  insertMany, close, connect, deleteMany,
} from './__mocks__/mongodb.js';
import logError from '../error/index.js';

jest.mock('mongodb');
jest.mock('../error/index.js');

const messages = [
  { text: 'Fair is foul' },
  { text: 'Foul is fair' },
];

describe('saveMessagesToDB', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('is callable', async () => saveMessagesToDB([], true));

  describe('happy path', () => {
    it('inserts into db', async () => {
      await saveMessagesToDB(messages);

      expect(insertMany).toBeCalledWith(messages);
    });

    it('closes connection', async () => {
      await saveMessagesToDB(messages);

      expect(close).toHaveBeenCalledTimes(1);
    });
  });

  describe('API errors', () => {
    describe('connection fails', () => {
      let initialImplementation;

      beforeEach(() => {
        initialImplementation = connect.getMockImplementation();
        connect.mockRejectedValueOnce("I don't wanna connect");
      });

      afterEach(() => {
        connect.mockImplementation(initialImplementation);
      });

      it('fails and tells the user', async () => {
        try {
          await saveMessagesToDB(messages);
        } catch (e) {
          expect(logError).toHaveBeenCalledTimes(1);
        }
      });
    });

    describe('insertMany fails', () => {
      let initialImplementation;

      beforeEach(() => {
        initialImplementation = insertMany.getMockImplementation();
        insertMany.mockRejectedValueOnce("I don't wanna connect");
      });

      afterEach(() => {
        insertMany.mockImplementation(initialImplementation);
      });

      it('fails and tells the user', async () => {
        try {
          await saveMessagesToDB(messages);
        } catch (e) {
          expect(logError).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  describe('overwrite option', () => {
    it('calls deleteMany', async () => {
      await saveMessagesToDB(messages, true);

      expect(insertMany).toHaveBeenCalledTimes(1);
      expect(deleteMany).toHaveBeenCalledTimes(1);
    });
  });
});
