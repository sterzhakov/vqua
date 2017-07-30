const findDomNode = require('../findDomNode')

describe('Find node by offset', () => {

  it('return dom node', () => {

    const createDiv = () => document.createElement('div')

    const parentNode = createDiv()
    const targetNode = createDiv()

    parentNode.appendChild( createDiv() )
    parentNode.appendChild( createDiv() )

    parentNode.childNodes[1].appendChild( createDiv() )
    parentNode.childNodes[1].appendChild( createDiv() )
    parentNode.childNodes[1].appendChild( createDiv() )

    parentNode.childNodes[1].childNodes[2].appendChild( createDiv() )
    parentNode.childNodes[1].childNodes[2].appendChild( createDiv() )
    parentNode.childNodes[1].childNodes[2].appendChild( createDiv() )
    parentNode.childNodes[1].childNodes[2].appendChild( targetNode )

    const findedNode = findDomNode(parentNode, [1,2,3])

    expect(
      findedNode.isEqualNode(targetNode)
    ).toBe(true)

  })

})
