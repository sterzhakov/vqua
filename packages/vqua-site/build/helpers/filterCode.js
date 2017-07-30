const { compose } = require('vqua-utils')

const filters = {

  cutAfter: (string) => {

    const keyword = "\n// cut after"

    const sliceIndex = string.lastIndexOf(keyword)

    return (sliceIndex > -1)
      ? string.slice(0, sliceIndex)
      : string

  },

  cutBefore: (string) => {

    const keyword = "// cut before\n\n"

    const sliceIndex = string.indexOf(keyword)

    return (sliceIndex > -1)
      ? string.slice(sliceIndex + keyword.length)
      : string

  }

}


const filter = (string, options = {}) => {

  const keys = Object.keys(options)

  if (keys.length == 0) return string

  const methods = keys.reduce((methods, key) => {

    if (options[key] && filters[key]) {

      return [ ...methods, filters[key] ]

    }

    return methods

  }, [])

  const run = compose(...methods)

  return run(string)

}

module.exports = filter
