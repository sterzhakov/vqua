const decorateNodes = require('../decorateNodes')
const { TAG_TYPE, TEXT_TYPE } = require('../../constants/nodeTypes')

describe('Decorate live nodes', () => {

  it('decorate with order with startFrom param', () => {

    const liveNodes = [{}, {}]

    const decoratedNodes =
      decorateNodes(liveNodes, { order: { startFrom: 2 } })

    expect(
      decoratedNodes[0].order
    ).toBe(2)

    expect(
      decoratedNodes[1].order
    ).toBe(3)

  })

  it('decorate with order', () => {

    const liveNodes = [{}, {}]

    const decoratedNodes = decorateNodes(liveNodes, { order: true })

    expect(
      decoratedNodes[0].order
    ).toBe(0)

    expect(
      decoratedNodes[1].order
    ).toBe(1)


  })

  it('decorate with dom node', () => {

    const liveNodes = [
      {
        type: TAG_TYPE,
        tag: 'div',
      },
      {
        type: TEXT_TYPE,
        text: 'text',
      }
    ]

    const textNode = document.createTextNode('text')
    const tagNode = document.createElement('div')

    const domNodes = [ tagNode, textNode ]

    const decoratedNodes = decorateNodes(liveNodes, { dom: domNodes })

    expect(
      decoratedNodes[0].dom.isSameNode(tagNode)
    ).toBe(true)

    expect(
      decoratedNodes[1].dom.isSameNode(textNode)
    ).toBe(true)

  })

})
