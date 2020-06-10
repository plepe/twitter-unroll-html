const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
})

function loadTweet (id, callback) {
  var params = { trim_user: true, tweet_mode: 'extended' }
  client.get('statuses/show/' + id, params, function (error, tweets, response) {
    if (error) {
      console.error(error)
    }

    if (!error) {
      console.log(JSON.stringify(tweets, null, '  '))
    }
  })
}

loadTweet('1234', (err, result) => {
  if (err) {
    return console.error(err)
  }

  console.log(JSON.stringify(result, null, '  '))
})
