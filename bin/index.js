#!/usr/bin/env node

import { program } from 'commander';
import dotenv from 'dotenv';
import fs from 'fs';
import { scrapeMessages, authenticate } from '../talkspace/index.js';
import saveMessagesToDB from '../mongo/index.js';
import logError from '../error/index.js';
import readlineSync from 'readline-sync';

dotenv.config();

const scrape = async () => {
  program.description('Scrape your message history from Talkspace')
    .option('-o, --overwrite', 'overwrite the existing records in MongoDB instance')
    .option('-u, --username <string>', 'your Talkspace username / email')
    .option('-f, --output-file <file>', 'output file to save JSON locally');

  program.on('-h, --help', () => console.log(program.helpInformation()));

  program.parse(process.argv);

  const {
    overwrite, outputFile,
  } = program;

  const usernamePrompt = 'What is your Talkspace username / email? > ';
  const username = program.username || process.env.USERNAME || readlineSync.question(usernamePrompt); 

  const passwordPrompt = 'What is your Talkspace password? > '
  const password = process.env.PASSWORD || readlineSync.question(passwordPrompt);
  
  const mongoPrompt = `If you'd like to use MongoDB, paste a connection string. If not, leave blank> `;
  const connectionString = process.env.MONGO_CONNECTION_STRING || readlineSync.question(mongoPrompt); 

  try {
    const messages = await scrapeMessages(
      await authenticate(username, password),
    );

    if (connectionString) {
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
