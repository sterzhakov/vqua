class WelcomeController {

  static index(req, res) {

    res.send(200, 'WelcomeContainer', {})

  }

}

module.exports = WelcomeController
