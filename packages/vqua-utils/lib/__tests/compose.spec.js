const compose = require('../compose')

describe('Compose', () => {

  it('return right calculation', () => {

    const plus2 = (number) => {

      return number + 2

    }

    const multiply2 = (number) => {

      return number * 2

    }

    const calculate = compose(multiply2, plus2)

    expect(
      calculate(2)
    ).toBe(8)

  })

})
