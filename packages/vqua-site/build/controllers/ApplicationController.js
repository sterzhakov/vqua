const { Controller } = require('vqua-controller')

class ApplicationController extends VquaController {

  config() {
    return {
      layout: require('../layouts/main')
    }
  }

}
