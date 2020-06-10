const Twitter = require('twitter')
const loadThread = require('./src/loadThread.js')

global.client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
})

loadThread('1234', (err, result) => {
  if (err) {
    return console.error(err)
  }

  console.log(JSON.stringify(result, null, '  '))
})
