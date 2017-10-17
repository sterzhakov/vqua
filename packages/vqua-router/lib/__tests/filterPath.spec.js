const filterPath = require('../filterPath')

describe('fitlerPath()', () => {

  it('remove all after hash', () => {

    expect(
      filterPath('http://my.ru/?name=test#test')
    ).toBe('http://my.ru/?name=test')

    expect(
      filterPath('http://my.ru/')
    ).toBe('http://my.ru/')

  })


})
