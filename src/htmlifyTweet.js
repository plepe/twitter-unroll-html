const htmlEscape = require('html-escape')

module.exports = function htmlifyTweet (tweet, callback) {
  let result = '<div class="full_text">' + htmlEscape(tweet.full_text)

  if (tweet.extended_entities && tweet.extended_entities.media) {
    result += '\n  <ul class="media">\n'

    result += tweet.extended_entities.media.map(media => {
      return '    <li><a href="' + htmlEscape(media.media_url_https) + '"><img src="' + htmlEscape(media.media_url_https) + '"></a></li>\n'
    }).join('')

    result += '  </ul>\n'
  }

  result += '</div>'

  callback(null, result)
}
