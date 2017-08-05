const Component = require('../../Component')
const createTagNode = require('../../createNode/createTagNode')
const { TAG_TYPE } = require('../../../constants/nodeTypes')

describe('Create tag node', () => {

  it('return clone of template node', () => {

    const templateNode = {
      type: TAG_TYPE,
      tag: 'div',
      props: { id: 1 },
      ref: {
        name: 'div',
        instance: {}
      },
      childs: []
    }

    expect(
      createTagNode({ templateNode })
    ).toEqual(templateNode)

  })

})
