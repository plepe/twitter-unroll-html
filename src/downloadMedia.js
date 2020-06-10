const fs = require('fs')
const async = require('async')
const http = require('https')

module.exports = function downloadMedia (thread, dir, callback) {
  async.each(
    thread,
    (tweet, done) => {
      if (!tweet.extended_entities || !tweet.extended_entities.media) {
        return done()
      }

      async.each(
        tweet.extended_entities.media,
        (media, done) => {
          const filename = media.media_url_https.match(/\/([A-Za-z0-9\-_]+\.[A-Za-z0-9]+)$/)
          if (!filename) {
            return done(new Error("Can't parse filename from \"" + media.media_url_https + "\""))
          }

          const file = fs.createWriteStream(dir + '/' + filename[1])
          const request = http.get(media.media_url_https, (response) => {
            response.pipe(file)
            done()
          })
        },
        done
      )
    },
    callback
  )
}
