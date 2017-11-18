const fs = require('fs')
const path = require('path')

class Store {

  static async all() {

    return typeof window == "undefined"
      ? await this.allByServer()
      : this.allByBrowser()

  }

  static allByBrowser() {

    const context = require.context('../controllers', false, /.js$/)

    const controllers = context.keys().reduce((controllers, filePath) => {

      const controllerName = filePath.slice(2, -3)

      const Controller = context(filePath)

      return Object.assign({}, controllers, {
        [controllerName]: new Controller
      })

    }, {})

    return controllers

  }

  static allByServer() {

    return new Promise((resolve, reject) => {

      const dir = path.resolve(__dirname, '../controllers')

      fs.readdir(dir, (error, files) => {

        if (error) {

          reject(error)

        } else {

          const controllers = files.reduce((controllers, fileName) => {

            if (fileName == '__tests') return controllers

            const filePath = path.resolve(dir, fileName)

            const controllerName = fileName.slice(0, -3)

            const Controller = require(`${filePath}`)

            return Object.assign({}, controllers, {
              [controllerName]: new Controller
            })

          }, {})

          resolve(controllers)

        }

      })

    })


  }

}

module.exports = Store
