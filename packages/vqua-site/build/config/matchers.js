const { include } = require('vqua-utils')

const locales = ['ru','en']

module.exports = {
  knownLocale: {
    key: 'locale',
    matcher: (segment) => include(locales, segment)
  },
  unknownLocale: {
    key: 'locale',
    matcher: (segment) => !include(locales, segment)
  }
}
