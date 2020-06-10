const loadTweet = require('./loadTweet.js')

module.exports = function loadThread (lastId, callback) {
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
