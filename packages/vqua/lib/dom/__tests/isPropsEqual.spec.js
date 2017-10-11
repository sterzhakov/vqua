const isPropsEqual = require('../isPropsEqual')

describe('Is props equal for', () => {

  describe('function', () => {

    it('equal', () => {

      expect(
        isPropsEqual(
          () => { return 1 },
          () => { return 1 }
        )
      ).toBe(false)

    })

    it('not equal', () => {

      expect(
        isPropsEqual(
          () => { return 1 },
          () => { return 2 }
        )
      ).toBe(false)

    })

  })

  describe('string', () => {

    it('equal', () => {

      expect(
        isPropsEqual(
          'hello',
          'hello'
        )
      ).toBe(true)

    })

    it('not equal', () => {

      expect(
        isPropsEqual(
          'hello',
          'world'
        )
      ).toBe(false)

    })

  })

  describe('number', () => {

    it('equal', () => {

      expect(
        isPropsEqual(
          1,
          1
        )
      ).toBe(true)

    })

    it('not equal', () => {

      expect(
        isPropsEqual(
          1,
          2
        )
      ).toBe(false)

    })

  })

  describe('boolean', () => {

    it('equal', () => {

      expect(
        isPropsEqual(
          true,
          true
        )
      ).toBe(true)

    })

    it('not equal', () => {

      expect(
        isPropsEqual(
          true,
          false
        )
      ).toBe(false)

    })

  })

})
