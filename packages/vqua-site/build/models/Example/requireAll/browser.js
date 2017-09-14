const getPathInfo = require('./getPathInfo')

module.exports = ({ humanId, raw } = {}) => {

  const context = raw
    ? require.context(
        '!raw-loader!../../../content/',
        true,
        /(.?)*\/examples\/(.?)*\.(js|sh|html)$/
      )
    : require.context(
        '../../../content/',
        true,
        /(.?)*\/examples\/(.?)*\.preview\.js$/
      )

  return context.keys().reduce((examples, pathname) => {

    const pathInfo = getPathInfo(pathname)

    if (pathInfo.articleName == humanId) {

      const content = context(pathname)

      const example = Object.assign({}, pathInfo, { content })

      return [ ...examples, example ]

    }

    return examples

  }, [])

}
