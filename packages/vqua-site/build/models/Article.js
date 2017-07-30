module.exports = {

  find: ({ name, locale }) => {

    return require('raw-loader!../articles/' + name + '.' + locale + '.html')

  }

}
