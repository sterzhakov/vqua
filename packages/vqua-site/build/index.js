const { render } = require('vqua')
const { matchRoutes } = require('vqua-router')
const routes = require('./config/routes')
const dom2vqua = require('dom2vqua')

const $app = document.getElementById('app')

let liveNodes = dom2vqua($app.childNodes)

const navigate = (path) => {

  new Promise((resolve, reject) => {

    const route = matchRoutes(routes, path)

    if (!route) resolve(false)

    const request = Object.assign({}, route.request)

    const response = { send: resolve }

    route.action.controller(request, response)

  }).then((data) => {

    // const context = { router: { navigate } }
    //
    // liveNodes = render($app, liveNodes, templateNodes, context)

    console.log(data)

  })

}

window.onpopstate = (event) => {

  navigate(document.location.pathname, routes)

}

navigate(document.location.pathname, routes)
