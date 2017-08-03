const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

module.exports = (request, response, callback) => {

  const { publicPath } = request.config

  const requestPath = path.join(publicPath, path.normalize(request.url))

  fs.stat(requestPath, (error, stats) => {

    if (error) {

      callback(error)

    } else {

      const file = fs.createReadStream(requestPath)

      response.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': mime.lookup(requestPath),
      })

      file.pipe(response)

    }

  })

}
