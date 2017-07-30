const { getRightSpaces, getLeftSpaces } = require('../spaces')

describe('Spaces', () => {

  describe('get right spaces', () => {

    it('three spaces', () => {

      expect(
        getRightSpaces(' hello world    ')
      ).toBe('    ')

    })

    it('zero spaces', () => {

      expect(
        getRightSpaces(' hello world')
      ).toBe('')

    })

  })

  describe('get left spaces', () => {

    it('three spaces', () => {

      expect(
        getLeftSpaces('   hello world ')
      ).toBe('   ')

    })

    it('zero spaces', () => {

      expect(
        getLeftSpaces('hello world ')
      ).toBe('')

    })

  })

})
