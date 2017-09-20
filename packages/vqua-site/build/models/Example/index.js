const escapeHtml = require('escape-html')

class Example {

  static async all(params) {

    try {

      return (typeof __webpack_require__ == 'function')
        ? require('./requireAll/browser')(params)
        : await require('./requireAll/server')(params)


    } catch (error) {

      return []

    }

  }

}

module.exports = Example
