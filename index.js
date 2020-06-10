const Twitter = require('twitter')
const ArgumentParser = require('argparse').ArgumentParser

const loadThread = require('./src/loadThread.js')
const htmlifyThread = require('./src/htmlifyThread.js')

parser = new ArgumentParser({
  addHelp: true
})

parser.addArgument(
  [ 'id' ],
  {
    help: 'ID of the tweet which ends the thread.'
  }
)

const args = parser.parseArgs()

global.client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
})

loadThread(args.id, (err, thread) => {
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

    console.log(html)
  })
})
