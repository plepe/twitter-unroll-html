const fs = require('fs')
const async = require('async')

let ids = {}
let callbacks = null
let cache

module.exports = function getUserInfo (twitterClient, userId, callback) {
  ids[userId] = true

  if (callbacks) {
    return callbacks.push({userId, callback})
  }

  callbacks = [{userId, callback}]
  global.setTimeout(() => run(twitterClient), 1)
}

function run (twitterClient) {
  fs.readFile('user-cache.json', (err, body) => {
     if (err && err.code !== 'ENOENT') { return console.error(err.toString()) }

    cache = JSON.parse(body || '{}')
    let _ids = Object.keys(ids)
    ids = {}

    let toLookup = _ids.filter(id => !(id in cache))

    if (toLookup.length) {
      twitterClient.get('users/lookup', { user_id: toLookup.join(',') }, (err, result) => {
        result.forEach(user => {
          cache[user.id_str] = user
        })

        fs.writeFile('user-cache.json', JSON.stringify(cache, null, '  '), (err) => {
          if (err) { console.error(err.toString()) }

          reply()
        })
      })
    } else {
      reply()
    }
  })
}

function reply () {
  callbacks.forEach(cb => {
    cb.callback(null, cache[cb.userId])
  })
}
