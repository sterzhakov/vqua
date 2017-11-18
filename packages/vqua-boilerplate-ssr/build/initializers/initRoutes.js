const routes = require('../config/routes')
const Controller = require('../models/Controller')
const { initRoutes } = require('vqua-router')

module.exports = async function() {

  const controllers = await Controller.all()

  return initRoutes({ routes, controllers })

}
