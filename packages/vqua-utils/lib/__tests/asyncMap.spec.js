const asyncMap = require('../asyncMap')

describe('Async map', () => {

  it('return array of increasing indexes with decreasing timers', (done) => {

    asyncMap([null, null, null], (item, index, callback) => {
      setTimeout(() => {
        callback(null, index)
      }, (3 - index) * 10)

    }, (error, items) => {
      expect(items).toEqual([0,1,2])
      done()
    })

  })

  it('return array from indexes', (done) => {

    const items = [null, null, null]

    const mapper = (item, index, callback) => {
      setTimeout(() => {
        callback(null, index)
      }, 10)
    }

    asyncMap(items, mapper, (error, result) => {
      expect(result).toEqual([0,1,2])
      done()
    })

  })

  it('return error', (done) => {

    const items = [1,2,3]

    const mapper = (item, index, callback) => {
      undefinedVariable
    }

    asyncMap(items, mapper, (error, result) => {
      expect(!!error).toBe(true)
      expect(result).toBe(null)
      done()
    })

  })

  it('return new array', (done) => {

    const items = [1,2,3]

    const mapper = (item, index, callback) => {
      setTimeout(() => {
        callback(null, item * 2)
      }, 10)
    }

    asyncMap(items, mapper, (error, result) => {
      expect(result).toEqual([2,4,6])
      done()
    })

  })

  it('return empty array', (done) => {

    const items = []

    const mapper = () => {}

    asyncMap(items, mapper, (error, result) => {
      expect(result).toEqual([])
      done()
    })

  })

})
