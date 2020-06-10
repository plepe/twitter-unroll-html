# twitter-unroll-html
Download a twitter thread and save it as HTML file (including media).

## INSTALLATION
```sh
npm install -g twitter-unroll-html
```

## USAGE
```sh
twitter-unroll-html --api_key=foo --api_secret=bar <id>
```

You have to register an App on developer.twitter.com. Receive the Consumer API keys from the website and use these as parameters.

This will create a directory `<id>` with a `index.html` and all the media of the thread which ends in `<id>`. Also, the full data of the tweets of the thread will be saved in `thread.json`.
