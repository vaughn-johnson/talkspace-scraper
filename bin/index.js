#!/usr/bin/env node

import { program } from 'commander';
import dotenv from 'dotenv';
import fs from 'fs';
import { scrapeMessages, authenticate } from '../talkspace/index.js';
import saveMessagesToDB from '../mongo/index.js';
import logError from '../error/index.js';

dotenv.config();

const scrape = async () => {
  program.description('Scrape your message history from Talkspace')
    .option('-o, --overwrite', 'overwrite the existing records in MongoDB instance')
    .option('-u, --username <string>', 'your Talkspace username / email')
    .option('-p, --password <string>', 'Your Talkspace passowrd')
    .option('-c, --connection-string <MongoDB connection>', 'Mongo db connection string. If specified, will ignore --output-file')
    .option('-f, --output-file <file>', 'output file to save JSON locally');

  program.on('-h, --help', () => console.log(program.helpInformation()));

  program.parse(process.argv);

  const {
    username, password, connectionString, overwrite, outputFile,
  } = program;

  if (!username && !process.env.USERNAME) {
    logError('You need to specify your Talkspace email using -username or in a .env');
    return;
  }

  if (!password && !process.env.PASSWORD) {
    logError('You need to specify your Talkspace password using -password or in a .env');
    return;
  }

  try {
    const messages = await scrapeMessages(
      await authenticate(username, password),
    );

    if (!connectionString && !process.env.MONGO_CONNECTION_STRING) {
      fs.writeFile(outputFile || 'messages.json', JSON.stringify(messages), (err) => {
        if (err) {
          logError('Failed to save messages to local file');
          throw err;
        }

        console.log(`Messages saved to ${outputFile || 'messages.json'}`);
      });
    } else {
      await saveMessagesToDB(messages, overwrite, connectionString);
    }
  } catch (e) {
    logError(`Did not succeed: ${e.message}`);
  }
};

scrape();
