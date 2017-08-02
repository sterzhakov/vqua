module.exports = (pathname) => {

  const fileName = pathname.split(/[\\/]/).pop()

  const anyExtension = /\.[^.]+$/

  const fileExtension = fileName.match(anyExtension)[0]

  const segments = fileName
    .slice(0, -fileExtension.length)
    .split(/_|\./)

  return {
    articleName: segments[0],
    variableName: segments[1],
    fileName: fileName,
    fileExtension: fileExtension,
    isPreview: segments[2] == 'preview'
  }


}
