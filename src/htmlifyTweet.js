const htmlEscape = require('html-escape')

module.exports = function htmlifyTweet (tweet, callback) {
  let result = '<div class="full_text">' + htmlEscape(tweet.full_text)

  if (tweet.extended_entities && tweet.extended_entities.media) {
    result += '\n  <ul class="media">\n'

    result += tweet.extended_entities.media.map(media => {
      const filename = media.media_url_https.match(/\/([A-Za-z0-9\-_]+\.[A-Za-z0-9]+)$/)
      if (!filename) {
        return console.error("Can't parse filename from \"" + media.media_url_https + "\"")
      }


      return '    <li><a href="' + htmlEscape(filename[1]) + '"><img src="' + htmlEscape(media.media_url_https) + '"></a></li>\n'
    }).join('')

    result += '  </ul>\n'
  }

  result += '</div>'

  callback(null, result)
}
