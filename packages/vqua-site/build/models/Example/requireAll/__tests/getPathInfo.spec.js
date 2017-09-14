const getPathInfo = require('../getPathInfo')

describe('Get file info', () => {

  it('by pathname with preview', () => {

    const pathname = './sample/examples/test.preview.js'

    expect(
      getPathInfo(pathname)
    ).toEqual({
      articleName: 'sample',
      variableName: 'test',
      fileName: 'test.preview.js',
      fileExtension: '.js',
      isPreview: true,
    })

  })

  it('by pathname without preview', () => {

    const pathname = './sample/examples/test.js'

    expect(
      getPathInfo(pathname)
    ).toEqual({
      articleName: 'sample',
      variableName: 'test',
      fileName: 'test.js',
      fileExtension: '.js',
      isPreview: false,
    })

  })



})
