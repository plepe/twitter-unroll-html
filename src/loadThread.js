const loadTweet = require('./loadTweet.js')

module.exports = function loadThread (twitterClient, lastId, callback) {
  loadTweet(twitterClient, lastId, (err, tweet) => {
    if (err) { return callback(err) }

    if (tweet.in_reply_to_status_id_str) {
      loadThread(twitterClient, tweet.in_reply_to_status_id_str, (err, thread) => {
        if (err) { return callback(err) }

        thread.push(tweet)

        callback(null, thread)
      })
    } else {
      callback(null, [tweet])
    }
  })
}
