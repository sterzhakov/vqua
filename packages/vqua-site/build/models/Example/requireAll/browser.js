const getPathInfo = require('./getPathInfo')

module.exports = ({ name, raw } = {}) => {

  const context = raw
    ? require.context('raw-loader!../../../examples/', true, /\.(js|sh|html)$/)
    : require.context('../../../examples/', true, /\.preview\.js$/)

  return context.keys().reduce((examples, pathname) => {

    const pathInfo = getPathInfo(pathname)

    if (pathInfo.articleName == name) {

      const content = context(pathname)

      const example = Object.assign({}, pathInfo, { content })

      return [ ...examples, example ]

    }

    return examples

  }, [])

}
