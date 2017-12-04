const Component = require('../../Component')
const createRootNode = require('../../createNode/createRootNode')
const { ROOT_TYPE } = require('../../../constants/nodeTypes')
const Statistic = require('../../Statistic')

describe('Create root node', () => {

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
