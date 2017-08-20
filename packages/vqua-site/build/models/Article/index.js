const fs = require('fs')
const path = require('path')

module.exports = {

  find: ({ humanId, locale }) => new Promise((resolve, reject) => {

    if (typeof __webpack_require__ == 'function') {

      try {

        const file =
          require(
            'raw-loader!../../articles/' +
            humanId +
            '.' +
            locale +
            '.html'
          )

        resolve(file)

      } catch (error) {

        resolve(error.message)

      }


    } else {

      const filePath =
        path.join(
          __dirname,
          '../../articles/' + humanId + '.' + locale + '.html'
        )

      fs.readFile(filePath, 'utf8', (error, file) => {

        if (error) {

          resolve(error.message)

        } else {

          resolve(file)

        }


      })

    }

  })

}
