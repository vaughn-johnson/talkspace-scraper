# Talkspace Scraper
A script that pull your entire message history from Talkspace

# How to use

## Steps

### 1. Setup MongoDB
You have a few options. I personally am using [the free tier of the online managed MongoDB servcie](https://www.mongodb.com/pricing_).
However, as a proof of concept, you can simply follow [the instructions here](https://docs.mongodb.com/manual/administration/install-community/) to get it running locally. On my Mac, 

```{bash}
  $> brew tap mongodb/brew
  $> brew install mongodb-community@4.4
  $> brew services start mongodb-community
```
was sufficient to get a local instance going. The connection string for this local instance is just `mongodb://localhost`

### 2. Setup `.env`
In order to scrape data from your own Talkspace account and load it into your own database, you'll need to specify some secrets
in your `.env`. Specifically, you'll need to set `USERNAME`, `PASSWORD`, and `MONGO_CONNECTION_STRING`. You can just fill out `example.env` and then run `$> mv example.env .env` to set your environmet.

### 3. Run the script
Make sure you're using the version of node specified in `package.json`. There are two scripts that do roughly the same thing. 

- `scrapeAndOverwrite` will clear out your `talkspace` database in your MongoDB instance, and overwrite it with the messages it scrapes
- `scrapeAndAppend` will just add the messages it finds to the exisitng `talkspace` collection.

In both cases, the collection `talkspace` does not need to exist a priori for the scripts to work.

To run the scripts, run

```{bash}
$> npm run scrapeAndAppend
$> npm run scrapeAndOverwrite
```

You can validate that the script worked using a gui like [this one](https://www.mongodb.com/try/download/compass)

# Known Issues

## Message Limit
Right now, the script will only take the 1024 most recent messages you have with your therapist.
It is naive to the possibility you could have more than 1024 messages.

## Multiple Therapist Rooms
A room is one of the conversations on the right side of the application. The script return the data from _only_ the room that _has most recently been messaged_. If you would like data from another room, the current work around is to message that room with a dummy message to make it the most recent.

## Linting
`index.js` uses [`top-level await`](https://v8.dev/features/top-level-await), which is in stage three, but eslint [only supports stage four and above](https://github.com/eslint/espree/issues/409#issuecomment-465070765) only supports stage four. This results in a parse error when linting that _can't_ be avoided by disabling eslint in `index.js`.


