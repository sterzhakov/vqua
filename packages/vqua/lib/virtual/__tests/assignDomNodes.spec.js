const assignDomNodes = require('../assignDomNodes')

describe('Assign dom nodes', () => {

  it('return new array', () => {

    const liveNodes = [
      {
        tag: 'div',
        childs: [
          {
            tag: 'div',
            childs: []
          },
          {
            tag: 'div',
            childs: []
          },
        ]
      }
    ]

    const domNodes = [
      {
        id: 1,
        childNodes: [
          {
            id: 2,
            childNodes: []
          },
          {
            id: 3,
            childNodes: []
          },
        ]
      }
    ]

    assignDomNodes({ liveNodes, domNodes })

    expect(liveNodes[0].dom.id).toBe(1)
    expect(liveNodes[0].childs[0].dom.id).toBe(2)
    expect(liveNodes[0].childs[1].dom.id).toBe(3)

  })

})
