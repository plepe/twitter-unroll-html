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

## API
twitter-unroll-html can be used as module in other projects. Use this:

```js
const Twitter = require('twitter')
const twitterUnrollHtml = require('twitter-unroll-html')

const twitterClient = new Twitter({
  consumer_key: 'api_key',
  consumer_secret: 'api_secret',
  access_token_key: '',
  access_token_secret: ''
})

const htmlifyOptions = {
}

// 12345 is the status id of the last tweet in the thread.
twitterUnrollHtml.loadThread(twitterClient, 12345, (err, thread) => {
  // this will build a simple HTML list with all tweets including <img> tags
  // for all media files.
  twitterUnrollHtml.htmlifyThread(thread, htmlifyOptions, (err, body) => {
    console.log(body)
  })

  // this will download all files to the specified directory (media).
  twitterUnrollHtml.downloadMedia(thread, 'media/', (err) => {})
})
```
