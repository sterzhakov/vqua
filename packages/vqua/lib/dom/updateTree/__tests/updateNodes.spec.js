const { CREATE_NODE } = require('../../../constants/actionTypes')
const updateNodes = require('../../updateTree/updateNodes')

describe('Update dom nodes, call update callback', () => {

  it('with patch node and parent dom node', () => {

    const parentDomNode = { tagName: 'div' }

    const patchNodes = [{ templateNode: { tag: 'div' }, childs: [] }]

    const spy = { updateDomNode: () => {} }

    spyOn(spy, 'updateDomNode')

    updateNodes({ patchNodes, parentDomNode, updateDomNode: spy.updateDomNode })

    const args = spy.updateDomNode.calls.allArgs()[0][0]

    expect(args.parentDomNode).toEqual(parentDomNode)
    expect(args.templateNode).toEqual(patchNodes[0].templateNode)

  })

  it('with dom node from result of update node', () => {

    const parentDomNodes = [{ tagName: 'div' }, { tagName: 'span' }]

    const patchNodes = [
      {
        templateNode: { tag: 'div' },
        childs: [
          {
            templateNode: { tag: 'div' },
            childs: []
          }
        ]
      }
    ]

    const spy = { updateDomNode: () => { return parentDomNodes[1] } }

    spyOn(spy, 'updateDomNode').and.callThrough()

    updateNodes({
      patchNodes,
      parentDomNode: parentDomNodes[0],
      updateDomNode: spy.updateDomNode
    })

    const args = spy.updateDomNode.calls.allArgs()[1][0]
    expect(args.parentDomNode).toEqual(parentDomNodes[1])

  })

})
