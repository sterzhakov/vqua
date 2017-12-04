const Component = require('../../Component')
const createTagNode = require('../../createNode/createTagNode')
const { TAG_TYPE } = require('../../../constants/nodeTypes')
const Statistic = require('../../Statistic')

describe('Create tag node', () => {

  it('create node with data-vqua-key params', () => {

    const templateNode = {
      type: TAG_TYPE,
      tag: 'div',
      props: { id: 1 },
      childs: [],
      key: 1,
    }

    const newNode =
      createTagNode({
        templateNode
      })

    expect(newNode.props).toEqual({
      id: 1,
      'data-vqua-key': 1
    })

  })


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
