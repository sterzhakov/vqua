const getLeftSpaces = (string) => {

  const matches = string.match(/^\s+/g)

  return matches ? matches[0] : ''

}

const getRightSpaces = (string) => {

  const matches = string.match(/\s+$/g)

  return matches ? matches[0] : ''

}

module.exports = { getLeftSpaces, getRightSpaces }
