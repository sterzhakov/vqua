const requireAllExamples = require('../browser')

describe('Examples', () => {

  it('require all by browser', () => {

    const examples =
      requireAllExamples({
        humanId: 'sample'
      })

    expect(examples.length).toBe(1)
    expect(examples[0].articleName).toBe('sample')
    expect(examples[0].variableName).toBe('test')
    expect(examples[0].fileName).toBe('sample_test.preview.js')
    expect(examples[0].fileExtension).toBe('.js')
    expect(examples[0].isPreview).toBe(true)

    expect(examples[0].content).toBe('sample')

  })

  it('require all raw by browser', () => {

    const examples =
      requireAllExamples({
        humanId: 'sample',
        raw: true
      })

    expect(examples.length).toBe(1)
    expect(examples[0].articleName).toBe('sample')
    expect(examples[0].variableName).toBe('test')
    expect(examples[0].fileName).toBe('sample_test.preview.js')
    expect(examples[0].fileExtension).toBe('.js')
    expect(examples[0].isPreview).toBe(true)

    expect(examples[0].content).toBe("module.exports = 'sample'\n")

  })

})
