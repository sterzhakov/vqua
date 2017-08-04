const htmlQuotes = require('../htmlQuotes')

describe('Html quotes', () => {

  it('encode', () => {

    expect(
      htmlQuotes.encode('<div></div>')
    ).toBe(
      '&lt;div&gt;&lt;/div&gt;'
    )

  })

  it('decode', () => {

    expect(
      htmlQuotes.decode('&lt;div&gt;&lt;/div&gt;')
    ).toBe(
      '<div></div>'
    )

  })

})
