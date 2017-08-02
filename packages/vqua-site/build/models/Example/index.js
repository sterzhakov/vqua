class Example {

  static async all(params) {

    return (typeof __webpack_require__ == 'function')
      ? require('./requireAll/browser')(params)
      : await require('./requireAll/server')(params)

  }

}

module.exports = Example
