const Component = require('../../Component')
const createTextNode = require('../../createNode/createTextNode')
const { TEXT_TYPE } = require('../../../constants/nodeTypes')
const Statistic = require('../../Statistic')

describe('Create text node', () => {

  it('create node with statistic params', () => {

    const templateNode = {
      type: TEXT_TYPE,
      text: 'some text'
    }

    const newNode =
      createTextNode({
        templateNode,
        statistic: new Statistic
      })

    expect(newNode.statistic instanceof Statistic).toBe(true)

  })

  it('return clone of text node', () => {

    const templateNode = {
      type: TEXT_TYPE,
      text: 'some text'
    }

    const newNode =
      createTextNode({
        templateNode
      })

    expect(newNode).toEqual(templateNode)

  })

})
