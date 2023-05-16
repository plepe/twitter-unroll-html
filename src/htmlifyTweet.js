const getUserInfo = require('./getUserInfo.js')
const Twig = require('./twig')

const defaultFormat = `
<div class="header">
<span class="author"><a href="https://twitter.com/{{ user.screen_name }}">{{ user.name }}</a><span>
<span class="date"><a href="{{ tweet.url }}">{{ tweet.created_at|moment(options.timeFormat|default('llll')) }}</a></span>
</div>
<div class="full_text">{{ tweet.text|nl2br }}
{% if not options.htmlHideImages and tweet.extended_entities and tweet.extended_entities.media %}
<ul class="media">
{% for media in tweet.extended_entities.media %}
{% set filename = media.media_url_https|split('/')|last %}
<li><a href="{{ filename }}"><img src="{{ filename }}"></a></li>
{% endfor %}
</ul>
{% endif %}
</div>
`

module.exports = function htmlifyTweet (twitterClient, tweet, options, callback) {
  getUserInfo(twitterClient, tweet.user.id_str, (err, user) => formatTweet(tweet, user, options, callback))
}

function formatTweet (tweet, user, options, callback) {
  tweet.text = tweet.full_text.split(' ').slice(0, -1).join(' ')
  tweet.url = tweet.full_text.split(' ').pop()

  const template = Twig.twig({ data: options.tweetFormat ?? defaultFormat })

  const result = template.render({ user, tweet, options })

  callback(null, result)
}
