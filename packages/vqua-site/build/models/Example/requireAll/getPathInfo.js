const { last } = require('vqua-utils')

module.exports = (pathname) => {

  const pathSegments = pathname.split('/')
  const articleName = pathSegments[pathSegments.length - 3]
  const fileName = pathSegments[pathSegments.length - 1]

  const fileNameSegments = fileName.split('.')
  const isPreview = fileNameSegments[fileNameSegments.length - 2] == 'preview'
  const variableName = fileNameSegments[0]
  const fileExtension = fileNameSegments.length > 1
    ? '.' + last(fileNameSegments)
    : undefined

  return {
    articleName,
    variableName,
    fileName,
    fileExtension,
    isPreview
  }

}
