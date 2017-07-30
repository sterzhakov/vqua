const { TEXT_TYPE } = require('vqua/lib/constants/nodeTypes')
const convertText = require('../convertText')

describe('Convert vqua text to string', () => {

  it('text node', () => {

    const node = {
      type: TEXT_TYPE,
      text: 'some text',
    }

    const string = convertText(node)

    expect(string).toBe('some text')

  })


})
