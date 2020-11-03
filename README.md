# Talkspace Scraper
A commandline application that pulls your entire message history from Talkspace

# Installation

```{bash}
npm install talkspace-scraper -g
```

# Usage

[![asciicast](https://asciinema.org/a/370236.svg)](https://asciinema.org/a/370236)

To use, you can simply call

```
$ talkspace-scrape
```

Make sure you're using the [correct version of node](https://github.com/nvm-sh/nvm) specified in `package.json`. 

You have the choice of either defining your `username`, `password`, and `connection_string` by being prompted in the commandline or as key value pairs in a local `.env` file.

## Using `.env`
If you want to use the `.env` approach, you'll need to set `USERNAME=...` and `PASSWORD=...`. If you wish to use MongoDB, also set `MONGO_CONNECTION_STRING=...`. Make sure your `.env` is in your current working directory when you call the application.

Here is an example `.env` file.
```
USERNAME=user
PASSWORD=pass
MONGO_CONNECTION_STRING=mongodb://localhost
```

If you have not defined a MongoDB connection, feel free to use the `-f` flag to designate a specific file you want your data outputted to (e.g. `scrape-talksapce -f output.json`). Specifying a MongoDB connection string will ignore any `--output-file` arguments passed from the commandline.


## Additional Options
You find additional options by calling

```{bash}
talkspace-scrape --help
```


# Setup MongoDB (optional)
This step isn't strictly neccesary. The tool will output to a file if you do not specify a MongoDB connection.

If you do wish to intgrate, you have a few options. I personally am using [the free tier of the online managed MongoDB servcie](https://www.mongodb.com/pricing_).
However, as a proof of concept, you can simply follow [the instructions here](https://docs.mongodb.com/manual/administration/install-community/) to get it running locally. On my Mac, 

```{bash}
 brew tap mongodb/brew
 brew install mongodb-community@4.4
 brew services start mongodb-community
```
was sufficient to get a local instance going. The connection string for this local instance is just `mongodb://localhost`. You can validate that the Talkspace data was saved to your chosen MongoDB instance using a gui like [this one](https://www.mongodb.com/try/download/compass).

If you are using MongoDB, the collection `talkspace` does not need to exist a priori for the scripts to work.




# How to contribute

Have a missing feature that you want? Open a pull-request! Just make sure your PR passes the `Node.js CI` workflow with sufficient test coverage.
