const Twitter = require('twitter')
const loadThread = require('./src/loadThread.js')
const htmlifyThread = require('./src/htmlifyThread.js')

global.client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
})

loadThread('1234', (err, thread) => {
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
