const convertText = require('../convertText')

describe('Convert text', () => {

  it('return new string', () => {

    const text = document.createTextNode('some text')

    const newNode = convertText(text)

    expect(newNode).toEqual('some text')

  })

})
