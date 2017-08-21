const Component = require('../../Component')
const createRootNode = require('../../createNode/createRootNode')
const { ROOT_TYPE } = require('../../../constants/nodeTypes')
const Statistic = require('../../Statistic')

describe('Create root node', () => {

  it('create node with statistic params', () => {

    const templateNode = {
      type: ROOT_TYPE,
      dom: {},
      childs: []
    }

    const newNode =
      createRootNode({
        templateNode,
        statistic: new Statistic
      })

    expect(newNode.statistic instanceof Statistic).toBe(true)

  })

  it('return clone of root node', () => {

    const templateNode = {
      type: ROOT_TYPE,
      dom: {},
      childs: []
    }

    expect(
      createRootNode({ templateNode })
    ).toEqual(templateNode)

  })

})
