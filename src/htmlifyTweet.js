module.exports = function htmlifyTweet (tweet, callback) {
  callback(null, tweet.full_text)
}
