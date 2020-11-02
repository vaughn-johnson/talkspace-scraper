import chalk from 'chalk';

export const errorMessage = (msg) => {
  // This is what we're going for
  //
  // =========
  // == msg ==
  // =========

  if (!msg) return null;

  const paddingLength = 2;
  const padding = ' '.repeat(paddingLength);
  const lines = msg.split('\n');
  const maxLength = lines.map((line) => line.length)
    .reduce((a, b) => (a > b ? a : b));

  // Make a sandwich
  const bread = '='.repeat((maxLength + 2 * (paddingLength + 2)));
  const meat = lines.map((line) => {
    const raggedRight = ' '.repeat(maxLength - line.length);
    return `==${padding}${line}${raggedRight}${padding}==`;
  }).join('\n');

  return `\n${bread}\n${meat}\n${bread}\n`;
};

export default (msg) => console.log(chalk.red.bold(errorMessage(msg)));
