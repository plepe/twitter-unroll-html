const htmlEscape = require('html-escape')

module.exports = function htmlifyTweet (tweet, callback) {
  let result = '<div class="full_text">' + htmlEscape(tweet.full_text) + '</div>'

  callback(null, result)
}
