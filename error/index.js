export const errorMessage = (msg) => {
  // This is what we're going for
  //
  // =========
  // == msg ==
  // =========

  const paddingLength = 2;
  const padding = ' '.repeat(paddingLength);
  const { length } = `${msg}`

  // Make a sandwich
  const bread = '='.repeat((length + 2 * (paddingLength + 2)));
  const meat = `==${padding}${msg}${padding}==`;
  return `\n${bread}\n${meat}\n${bread}\n`;
};

export default (msg) => console.log(errorMessage(msg));
