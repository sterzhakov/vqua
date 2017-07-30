const capitalize = require('../capitalize')

describe('Utils', () => {

  it('capitlize', () => {
    expect(
      capitalize('hello-world')
    ).toBe('Hello-world')
  })

})
