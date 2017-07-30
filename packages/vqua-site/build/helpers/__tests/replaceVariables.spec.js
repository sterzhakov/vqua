const replaceVariables = require('../replaceVariables')

describe('Replace variables', () => {

  it('without spaces', () => {

    expect(
      replaceVariables(' {Greeting}. Ho are you ')
    )

  })

  it('with spaces', () => {

    expect(
      replaceVariables(' Hello {name} ')
    )

  })

})
