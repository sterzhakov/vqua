const requireAllExamples = require('../server')

describe('Examples', () => {

  it('require all by server', (done) => {

    requireAllExamples({
      name: 'sample'
    }).then((examples) => {

      expect(examples.length).toBe(1)
      expect(examples[0].articleName).toBe('sample')
      expect(examples[0].variableName).toBe('test')
      expect(examples[0].fileName).toBe('sample_test.preview.js')
      expect(examples[0].fileExtension).toBe('.js')
      expect(examples[0].isPreview).toBe(true)

      expect(examples[0].content).toBe('sample')

      done()

    })

  })

  it('require all by server', (done) => {

    requireAllExamples({
      name: 'sample',
      raw: true
    }).then((examples) => {

      expect(examples.length).toBe(1)
      expect(examples[0].articleName).toBe('sample')
      expect(examples[0].variableName).toBe('test')
      expect(examples[0].fileName).toBe('sample_test.preview.js')
      expect(examples[0].fileExtension).toBe('.js')
      expect(examples[0].isPreview).toBe(true)

      expect(examples[0].content).toBe("module.exports = 'sample'\n")

      done()

    })

  })


})
