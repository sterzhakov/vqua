const handleError = require('../handleError')

describe('Handle error', () => {

  it('call errorExists() with error argument', () => {

    const spy = { errorExists: () => {} }

    const error = new Error('Some error')

    spyOn(spy, 'errorExists').and.callThrough()

    handleError(error, spy.errorExists)

    expect(
      spy.errorExists.calls.allArgs()
    ).toEqual([[error]])

  })

  it('call errorNotExists() when error doesn\'t present', () => {

    const spy = { errorNotExists: () => {} }

    spyOn(spy, 'errorNotExists').and.callThrough()

    handleError(null, null, spy.errorNotExists)

    expect(
      spy.errorNotExists.calls.allArgs()
    ).toEqual([[]])

  })

})
