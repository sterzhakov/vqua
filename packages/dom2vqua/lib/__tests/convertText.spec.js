const convertText = require('../convertText')
const { TEXT_TYPE } = require('vqua/lib/constants/nodeTypes')

describe('Convert text', () => {

  it('return new string', () => {

    const text = document.createTextNode('some text')

    const newNode = convertText(text)

    expect(newNode).toEqual({
      type: TEXT_TYPE,
      text: 'some text',
      dom: text,
    })

  })

})
