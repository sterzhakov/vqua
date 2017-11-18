const createServer = require('vqua-server')
const layout = require('./layout')
const initRoutes = require('../build/initializers/initRoutes')

initRoutes().then(routes => {

  const app =
    createServer({
      routes,
      layout,
      publicPath: './dist',
      componentPath: './build/containers',
    })

  app.listen(8000)


})


process.on('unhandledRejection', error => {

  console.log('unhandledRejection', error)

});
