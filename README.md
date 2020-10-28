# Talkspace Scraper
A script that pull your entire message history from Talkspace

# How to use

## Assumptions

## Steps

# Known Issues

## Linting
- `index.js` uses [`top-level await`](https://v8.dev/features/top-level-await), which is in stage three, but eslint [only supports stage four and above](https://github.com/eslint/espree/issues/409#issuecomment-465070765) only supports stage four. This results in a parse error when linting that can't be avoided by disabling eslint in `index.js`.


