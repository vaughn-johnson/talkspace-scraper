import error from '../index.js';

export default jest.fn((msg) => error(msg));
