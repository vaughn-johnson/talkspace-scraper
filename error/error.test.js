import { errorMessage } from './index.js';

describe('errorMessage', () => {
  const messages = [
    [undefined],
    [null],
    ['error'],
    ['e'.repeat(2 ** 5)],
    ['two differnt\nlines'],
  ];
  test.each(messages)(
    'matches snapshot with message %p',
    (msg) => expect(errorMessage(msg)).toMatchSnapshot(),
  );
});
