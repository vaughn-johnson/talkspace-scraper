# Talkspace Scraper
A script that pull your entire message history from Talkspace

# How to use

## Install

```{bash}
npm install talkspace-scraper
```

## (optional) Setup MongoDB
This step isn't strictly neccesary. The tool will output to a file if you do not specify a mongodb connection.

If you do wish to intgrate, you have a few options. I personally am using [the free tier of the online managed MongoDB servcie](https://www.mongodb.com/pricing_).
However, as a proof of concept, you can simply follow [the instructions here](https://docs.mongodb.com/manual/administration/install-community/) to get it running locally. On my Mac, 

```{bash}
  $> brew tap mongodb/brew
  $> brew install mongodb-community@4.4
  $> brew services start mongodb-community
```
was sufficient to get a local instance going. The connection string for this local instance is just `mongodb://localhost`

## (optional) Setup `.env`
You have the choice of either defining your `username`, `password`, and `connection_string` as arguments in the commandline or as key value pairs in a local `.env` file. If you want to use the `.env` approach, you'll need to set `USERNAME=...` and `PASSWORD=...`. If you wish to use mongodb, also set `MONGO_CONNECTION_STRING=...` in the same directory you plan to scrape the data in.

Here is an example
```
USERNAME=user
PASSWORD=pass
MONGO_CONNECTION_STRING=mongodb://localhost
```

## Run the script
Make sure you're using the [correct version of node](https://github.com/nvm-sh/nvm) specified in `package.json`. If you are using mongodb, the collection `talkspace` does not need to exist a priori for the scripts to work.

### using `.env`
Make sure you've followed the steps above to set up your `.env`, and then call `scrapeTalkspace`. If you have not defined a mongodb connection, feel free to use the `-f` flag to designate a specific file you want your data outputted to (e.g. `scrape-talksapce -f output.json`).

### using command-line arguments
```
$> scrape-talkspace -h

Usage: scrape-talkspace [options]

Scrape your message history from Talkspace

Options:
  -o, --overwrite                               overwrite the existing records in mongodb instance
  -u, --username <string>                       your talkspace username / email
  -p, --password <string>                       Your talkspace passowrd
  -c, --connection-string <mongodb connection>  Mongo db connection string. If specified, will ignore --output-file
  -f, --output-file <file>                      output file to save JSON locally
  -h, --help                                    display help for command
```

---
You can validate that the script worked using a gui like [this one](https://www.mongodb.com/try/download/compass)

---

# How to contribute

Have a missing feature that you want? Open a pull-request! Just make sure your PR passes the `Node.js CI` workflow with a passing status.
