import MongoClient from 'mongodb';
import logError from '../error/index.js';

const attemptMessage = (messages, overwrite) => {
  const count = messages.length;
  const writeWord = overwrite ? 'overwrite' : 'append';

  return `Attempting to ${writeWord} ${count} messages to mongodb`;
};

const saveMessagesToDB = async (messages,
  overwrite = false,
  connectionString = process.env.MONGO_CONNECTION_STRING) => {
  let client;

  try {
    console.log(attemptMessage(messages, overwrite));
    client = await MongoClient.connect(
      connectionString,
      { useUnifiedTopology: true },
    );

    const db = client.db('talkspace');

    // Destroy existing records
    if (overwrite) await db.collection('messages').deleteMany({});

    await db.collection('messages').insertMany(messages);
    console.log('Successfully saved messages to db');
  } catch (e) {
    logError('Failed to save scraped messages to DB');
    throw e;
  } finally {
    if (client) await client.close();
  }
};

export default saveMessagesToDB;
