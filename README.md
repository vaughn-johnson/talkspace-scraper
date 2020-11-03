# Talkspace Scraper
A commandline application that pulls your entire message history from Talkspace

# How to use

## Install

```{bash}
npm install talkspace-scraper
```

## (optional) Setup MongoDB
This step isn't strictly neccesary. The tool will output to a file if you do not specify a MongoDB connection.

If you do wish to intgrate, you have a few options. I personally am using [the free tier of the online managed MongoDB servcie](https://www.mongodb.com/pricing_).
However, as a proof of concept, you can simply follow [the instructions here](https://docs.mongodb.com/manual/administration/install-community/) to get it running locally. On my Mac, 

```{bash}
  $> brew tap mongodb/brew
  $> brew install mongodb-community@4.4
  $> brew services start mongodb-community
```
was sufficient to get a local instance going. The connection string for this local instance is just `mongodb://localhost`. You can validate that the Talkspace data was saved to your chosen MongoDB instance using a gui like [this one](https://www.mongodb.com/try/download/compass)


## (optional) Setup `.env`
You have the choice of either defining your `username`, `password`, and `connection_string` as arguments in the commandline or as key value pairs in a local `.env` file. If you want to use the `.env` approach, you'll need to set `USERNAME=...` and `PASSWORD=...`. If you wish to use MongoDB, also set `MONGO_CONNECTION_STRING=...`. Make sure your `.env` is in your current working directory when you call the application.

Here is an example `.env` file.
```
USERNAME=user
PASSWORD=pass
MONGO_CONNECTION_STRING=mongodb://localhost
```

## Use the tool 

[![asciicast](https://asciinema.org/a/tHkgoqDqAiMp5ScGdYR2OASHF.svg)](https://asciinema.org/a/tHkgoqDqAiMp5ScGdYR2OASHF)

Make sure you're using the [correct version of node](https://github.com/nvm-sh/nvm) specified in `package.json`. If you are using MongoDB, the collection `talkspace` does not need to exist a priori for the scripts to work.

### using `.env`
Make sure you've followed the steps above to set up your `.env`, and then call `talkspace-scrape`. If you have not defined a MongoDB connection, feel free to use the `-f` flag to designate a specific file you want your data outputted to (e.g. `scrape-talksapce -f output.json`).

### using command-line arguments
```
$> talkspace-scrape -h

Usage: talkspace-scrape [options]

Scrape your message history from Talkspace

Options:
  -o, --overwrite                               overwrite the existing records in MongoDB instance
  -u, --username <string>                       your Talkspace username / email
  -p, --password <string>                       Your Talkspace passowrd
  -c, --connection-string <MongoDB connection>  Mongo db connection string. If specified, will ignore --output-file
  -f, --output-file <file>                      output file to save JSON locally
  -h, --help                                    display help for command
```


# How to contribute

Have a missing feature that you want? Open a pull-request! Just make sure your PR passes the `Node.js CI` workflow with sufficient test coverage.
