#!/usr/bin/env node
const Twitter = require('twitter')
const ArgumentParser = require('argparse').ArgumentParser
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

const args = parser.parseArgs()

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

  htmlifyThread(thread, (err, html) => {
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
