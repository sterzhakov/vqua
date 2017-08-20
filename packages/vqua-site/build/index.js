const createNavigation = require('vqua-navigation')
const routes = require('./config/routes')

const navigation =
  createNavigation({
    routes,
    appDom: document.getElementById('app'),
    appDataDom: document.getElementById('app-data'),
    getContainer: name => require('./containers/' + name),
  })

navigation.listen()
