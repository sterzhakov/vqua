class MainController {

  static index(req, res) {

    res.redirect(302, '/ru')

  }

}

module.exports = MainController
