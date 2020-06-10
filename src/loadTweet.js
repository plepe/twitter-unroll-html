module.exports = function loadTweet (id, callback) {
  var params = { trim_user: true, tweet_mode: 'extended' }
  global.client.get('statuses/show/' + id, params, (err, tweet) => {
    if (err) {
      callback(err)
    }

    callback(null, tweet)
  })
}
