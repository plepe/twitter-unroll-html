const htmlEscape = require('html-escape')
const moment = require('moment')

const getUserInfo = require('./getUserInfo.js')

module.exports = function htmlifyTweet (twitterClient, tweet, options, callback) {
  getUserInfo(twitterClient, tweet.user.id_str, (err, user) => formatTweet(tweet, user, options, callback))
}

function formatTweet (tweet, user, options, callback) {
  let result = ''

  result += '<div class="header">'
  result += '<span class="author"><a href="https://twitter.com/' + user.screen_name + '">' + htmlEscape(user.name) + '</a></span> '
  result += '<span class="date">' + moment(new Date(tweet.created_at)).format(options.timeFormat || 'llll') + '</span>'
  result += '</div>'

  const fullText = tweet.full_text.split(' ').slice(0, -1).join(' ')
  result += '<div class="full_text">' + htmlEscape(fullText).replace(/\n/g, '<br>')

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
