const readDir = require('recursive-readdir')
const path = require('path')
const fs = require('fs')
const getPathInfo = require('./getPathInfo')

module.exports = async ({ name, raw } = {}) => {

  const dir = path.join(__dirname, '../../../examples')

  const files = await readDir(dir)

  return files.reduce((examples, pathname) => {

    const pathInfo = getPathInfo(pathname)

    if (pathInfo.articleName == name) {

      const content = raw
        ? fs.readFileSync(pathname).toString()
        : require(pathname)

      const example = Object.assign({}, pathInfo, { content })

      return [ ...examples, example ]

    }

    return examples

  }, [])

}
