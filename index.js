const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
})

function loadTweet (id, callback) {
  var params = { trim_user: true, tweet_mode: 'extended' }
  client.get('statuses/show/' + id, params, (err, tweet) => {
    if (err) {
      callback(err)
    }

    callback(null, tweet)
  })
}

function loadThread (lastId, callback) {
  loadTweet(lastId, (err, tweet) => {
    if (err) { return callback(err) }

    if (tweet.in_reply_to_status_id_str) {
      loadThread(tweet.in_reply_to_status_id_str, (err, thread) => {
        if (err) { return callback(err) }

        thread.push(tweet)

        callback(null, thread)
      })
    } else {
      callback(null, [tweet])
    }
  })
}

loadThread('1234', (err, result) => {
  if (err) {
    return console.error(err)
  }

  console.log(JSON.stringify(result, null, '  '))
})
