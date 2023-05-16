#!/usr/bin/env node
const Twitter = require('twitter')
const ArgumentParser = require('argparse').ArgumentParser
const moment = require('moment')
const fs = require('fs')
const async = require('async')

const loadThread = require('./src/loadThread.js')
const htmlifyThread = require('./src/htmlifyThread.js')
const downloadMedia = require('./src/downloadMedia.js')

parser = new ArgumentParser({
  addHelp: true
})

parser.addArgument(
  [ 'id' ],
  {
    help: 'ID of the tweet which ends the thread.'
  }
)

parser.addArgument(
  [ '--api_key' ],
  {
    help: 'The API key for the registered App on developer.twitter.com'
  }
)

parser.addArgument(
  [ '--api_secret' ],
  {
    help: 'The API secret key for the registered App on developer.twitter.com'
  }
)

parser.addArgument(
  [ '--locale' ],
  {
    help: 'Locale for formatting output (especially time formatting via moment.js).'
  }
)

parser.addArgument(
  [ '--time-format' ],
  {
    help: 'Format for formatting the tweet date, using moment.js.',
    default: 'llll'
  }
)

parser.addArgument(
  [ '--html-hide-images' ],
  {
    action: 'storeTrue',
    help: 'Just download media, but do not include in HTML output.'
  }
)

parser.addArgument(
  [ '--tweet-format' ],
  {
    help: 'Alternative format for formatting tweets. Check src/htmlifyTweet.js for the default format.'
  }
)

const args = parser.parseArgs()
const htmlifyOptions = {
  timeFormat: args.time_format,
  htmlHideImages: args.html_hide_images,
  tweetFormat: args.tweet_format
}

if (args.locale) {
  moment.locale(args.locale)
}

const twitterClient = new Twitter({
  consumer_key: args.api_key,
  consumer_secret: args.api_secret,
  access_token_key: '',
  access_token_secret: ''
})

loadThread(twitterClient, args.id, (err, thread) => {
  if (err) {
    return console.error(err)
  }

  htmlifyThread(twitterClient, thread, htmlifyOptions, (err, html) => {
    if (err) {
      return console.error(err)
    }

    html = '<!DOCTYPE html>\n<html>\n<head>\n' +
    '<meta charset="UTF-8">' +
    '<link rel="stylesheet" href="style.css">' +
    '</head>\n<body>\n' +
    html +
    '</body></html>'

    fs.mkdir(args.id, (err) => {
      if (err) { return console.error(err.toString()) }

      async.parallel([
        (done) => fs.writeFile(args.id + '/index.html', html, done),
        (done) => fs.writeFile(args.id + '/thread.json', JSON.stringify(thread, null, '  '), done),
        (done) => fs.copyFile('style.css', args.id + '/style.css', done),
        (done) => downloadMedia(thread, args.id, done),
      ],
      (err) => {
        if (err) {
          console.error(err.toString())
        }
      })
    })
  })
})
