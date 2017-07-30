const Component = require('../../Component')
const createTextNode = require('../../createNode/createTextNode')
const { TEXT_TYPE } = require('../../../constants/nodeTypes')

describe('Create text node', () => {

  it('return clone of text node', () => {

    const templateNode = {
      type: TEXT_TYPE,
      text: 'some text'
    }

    expect(
      createTextNode({ templateNode })
    ).toEqual(templateNode)

  })

})
