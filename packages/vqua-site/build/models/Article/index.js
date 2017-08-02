const fs = require('fs')

module.exports = {

  find: ({ name, locale }) => new Promise((resolve, reject) => {

    if (typeof __webpack_require__ == 'function') {

      const file = require(
        'raw-loader!../../articles/' + name + '.' + locale + '.html'
      )

      resolve(file)

    } else {

      const filePath =
        require.resolve(
          __dirname,
          '../../articles/${name}.${locale}.html'
        )

      fs.readFile(filePath, 'utf8', (error, file) => {

        if (error) {

          throw error

        } else {

          resolve(file)

        }


      })

    }

  })

}
