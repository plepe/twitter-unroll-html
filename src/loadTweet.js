module.exports = function loadTweet (twitterClient, id, callback) {
  var params = { trim_user: true, tweet_mode: 'extended' }
  twitterClient.get('statuses/show/' + id, params, (err, tweet) => {
    if (err) {
      return callback(err)
    }

    callback(null, tweet)
  })
}
