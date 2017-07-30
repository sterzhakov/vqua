const replaceVariables = require('../replaceVariables')

describe('Replace variables', () => {

  it('return array with parts of text', () => {

    const text = 'Hello {{ name }} from {{ author }}!'

    const items =
      replaceVariables(text, {
        name: 'stranger',
        author: 'sun'
      })

    expect(items).toEqual([
      'Hello ',
      'stranger',
      ' from ',
      'sun',
      '!'
    ])

  })

})
