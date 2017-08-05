const { render } = require('vqua')
const { matchRoutes } = require('vqua-router')
const { htmlQuotes } = require('vqua-utils')
const dom2vqua = require('dom2vqua')
const routes = require('./config/routes')

const $app = document.getElementById('app')

let liveNodes = dom2vqua($app.childNodes)

const navigate = (path) => {

  new Promise((resolve, reject) => {

    const vquaContainerData = document.getElementById('vqua-container-data')

    if (vquaContainerData) {

      const json = htmlQuotes.decode(vquaContainerData.innerHTML)

      const data = JSON.parse(json)

      vquaContainerData.parentNode.removeChild(vquaContainerData)

      resolve(data)

    } else {

      const route = matchRoutes(routes, path)

      if (!route) resolve(false)

      const request = Object.assign({}, route.request, {
        url: window.location.pathname
      })

      const response = {
        send: (containerName, props = {}, params = {}) => {
          resolve({ containerName, props, params })
        }
      }

      route.action(request, response)

    }

  }).then((data) => {

    const newContext = {
      context: Object.assign({}, data.context, { navigate: (url) => {

        history.pushState({}, '', url)

        navigate(url)

      } })
    }

    const newData = Object.assign({}, data, newContext)

    const Container = require('./containers/' + newData.containerName)

    const templateNodes = [Container.v(newData.props)]

    liveNodes = render($app, liveNodes, templateNodes, newData.context)

  })

}

window.onpopstate = (event) => {

  navigate(document.location.pathname, routes)

}

navigate(document.location.pathname, routes)
