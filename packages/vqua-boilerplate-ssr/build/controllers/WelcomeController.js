class WelcomeController {

  index(request, response) {

    response.send(200, 'WelcomeContainer', { props: {}, context: {} })

  }

}

module.exports = WelcomeController
