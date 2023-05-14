let callbacks = null
let ids = {}

module.exports = function loadTweet (twitterClient, id, callback) {
  ids[id] = true

  if (callbacks) {
    return callbacks.push({ id, callback })
  }

  callbacks = [{ id, callback }]
  global.setTimeout(() => run(twitterClient), 1)
}

function run (twitterClient) {
  const _cbs = callbacks
  const _ids = ids
  callbacks = null
  ids = {}

  var params = { id: Object.keys(_ids).join(','), trim_user: true, tweet_mode: 'extended' }
  twitterClient.get('statuses/lookup', params, (err, tweets) => {
    console.log(tweets)
    if (err) {
      return _cbs.forEach(cb => cb.callback(err))
    }

    const list = {}
    tweets.forEach(tweet => {
      list[tweet.id_str] = tweet
    })

    _cbs.forEach(cb => {
      if (cb.id in list) {
        cb.callback(null, list[cb.id])
      } else {
        console.log(cb.id, 'not found')
        cb.callback(null, null)
      }
    })
  })
}
