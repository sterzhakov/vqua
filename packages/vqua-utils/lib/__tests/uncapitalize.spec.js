const uncapitalize = require('../uncapitalize')

describe('Utils', () => {

  it('uncapitlize', () => {
    expect(
      uncapitalize('Hello-world')
    ).toBe('hello-world')
  })

})
