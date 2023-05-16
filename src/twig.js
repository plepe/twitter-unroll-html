const Twig = require('twig')
const moment = require('moment')

module.exports = Twig

Twig.extendFilter('moment', (value, param) => {
  return moment(new Date(value)).format(param[0])
})
