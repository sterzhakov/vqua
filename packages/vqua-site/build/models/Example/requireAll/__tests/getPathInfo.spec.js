const getPathInfo = require('../getPathInfo')

describe('Get file info', () => {

  it('by pathname with preview', () => {

    const pathname = './sample_test.preview.js'

    expect(
      getPathInfo(pathname)
    ).toEqual({
      articleName: 'sample',
      variableName: 'test',
      fileName: 'sample_test.preview.js',
      fileExtension: '.js',
      isPreview: true,
    })

  })

  it('by pathname without preview', () => {

    const pathname = './sample_test.js'

    expect(
      getPathInfo(pathname)
    ).toEqual({
      articleName: 'sample',
      variableName: 'test',
      fileName: 'sample_test.js',
      fileExtension: '.js',
      isPreview: false,
    })

  })



})
