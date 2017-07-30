const {
  filterLineBreaks,
  filterSpaces,
  getLeftSpaces,
  getRightSpaces
} = require('../filterText')

fdescribe('Filter text,', () => {

  describe('filter spaces', () => {

    it('multiple', () => {

      expect(
        filterSpaces('   sample text    ')
      ).toBe(
        'sample text'
      )

    })

    it('single', () => {

      expect(
        filterSpaces(' sample text ')
      ).toBe(
        ' sample text '
      )

    })

    it('without right single space', () => {

      expect(
        filterSpaces('sample text ')
      ).toBe(
        'sample text '
      )

    })

    it('without left single space', () => {

      expect(
        filterSpaces(' sample text')
      ).toBe(
        ' sample text'
      )

    })

    it('between', () => {

      expect(
        filterSpaces('sample    text')
      ).toBe(
        'sample text'
      )

    })

  })

  it('filter line breaks', () => {

    expect(
      filterLineBreaks(' \n sample text \n ')
    ).toBe(
      '  sample text  '
    )

  })

})
