module.exports = {

  localeMatcher: {

    key: 'locale',

    match: (locale) => {

      return ['en','ru'].indexOf(locale) > -1

    },

  }

}
