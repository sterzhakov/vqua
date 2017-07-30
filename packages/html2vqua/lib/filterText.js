const { getLeftSpaces, getRightSpaces } = require('./spaces')

const filterLineBreaks = (string) => {

  return string.replace(/(?:\r\n|\r|\n)/g, '')

}

const filterSpaces = (string) => {

  const leftSpaces = getLeftSpaces(string)

  const rightSpaces = getRightSpaces(string)

  const leftIndex = leftSpaces.length == 1 ? 0 : leftSpaces.length

  const rightIndex = rightSpaces.length == 1 ? 0 : rightSpaces.length

  const leftSliced = string.slice(leftIndex)

  const rightSliced = leftSliced.slice(0, leftSliced.length - rightIndex)

  return rightSliced.replace(/\s\s+/g, ' ')

}

module.exports = {
  filterLineBreaks,
  filterSpaces,
}
