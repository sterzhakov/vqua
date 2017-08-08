const Statistic = require('../Statistic')

describe('Statistic', () => {

  it('default last id is 0', () => {

    const statistic = new Statistic

    expect(
      statistic.getLastInstanceId()
    ).toBe(0)

  })

  it('increase last id 3 times', () => {

    const statistic = new Statistic

    statistic.increaseLastInstanceId()
    statistic.increaseLastInstanceId()
    statistic.increaseLastInstanceId()

    expect(
      statistic.getLastInstanceId()
    ).toBe(3)

  })

})
