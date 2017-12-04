const Core = require('../index')

describe('Core', () => {

  it('default last id is 0', () => {

    const core = new Core

    expect(
      core.getLastUpdateId()
    ).toBe(0)

  })

  it('increase last id 3 times', () => {

    const core = new Core

    core.increaseLastUpdateId()
    core.increaseLastUpdateId()
    core.increaseLastUpdateId()

    expect(
      core.getLastUpdateId()
    ).toBe(3)

  })

})
