const async = require('async')

const htmlifyTweet = require('./htmlifyTweet.js')

module.exports = function htmlifyThread (thread, options, callback) {
  async.map(
    thread,
    (tweet, done) => {
      htmlifyTweet(tweet, options, (err, result) => {
        done(err, '<li>' + result + '</li>\n')
      })
    },
    (err, result) => {
      callback(err, '<ul class="thread">' + result.join('') + '</ul>\n')
    }
  )
}
