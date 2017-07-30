const classNames = require('../classNames')

describe('Class names', () => {

  it('concat strings', () => {

    expect(
      classNames('1', 2, undefined, null, false, true, '3', ['4', 5])
    ).toEqual('1 2 3 4 5')

  })

  it('from object', () => {
    expect(
      classNames('1',['2'],'3', { 4: true }, [{ 5: true, 6: false }])
    ).toEqual('1 2 3 4 5')
  })

})
