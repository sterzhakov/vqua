const readDir = require('recursive-readdir')
const path = require('path')
const fs = require('fs')
const getPathInfo = require('./getPathInfo')

module.exports = async ({ humanId, raw } = {}) => {

  const dir = path.join(__dirname, '../../../examples')

  const files = await readDir(dir)

  return files.reduce((examples, pathname) => {

    const pathInfo = getPathInfo(pathname)

    if (pathInfo.articleName == humanId) {

      const content = raw
        ? fs.readFileSync(pathname).toString()
        : pathInfo.isPreview ? require(`${pathname}`) : null

      const example = Object.assign({}, pathInfo, { content })

      return [ ...examples, example ]

    }

    return examples

  }, [])

}
