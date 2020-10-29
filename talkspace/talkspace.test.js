import scrapeMessages, { authenticate, getRoomId } from './index.js';

describe('scrapeMessages', () => {
  describe('happy path', () => {
    it('queries talkspace', () => {

    });

    it('an array of messages', () => {

    });

    it('authenticates itself if it needs to', () => {

    });
  });

  describe('API errors', () => {
    describe('authentication fails', () => {
      it('tells user', () => {});
    });
    
    describe('fails to get room id', () => {
      it('tells user', () => {});
    });
    
    describe('message query fails', () => {
      it('tells user', () => {});
    });
  });
});

describe('authenticate', () => {
  it('sends request with certain body and options', () => {

  });
});

describe('getRoomId', () => {
  it('sends request with certain body and options', () => {
    
  });

  it('authenticates itself if it needs to', () => {

  });
});