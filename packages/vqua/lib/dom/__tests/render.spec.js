const render = require('../render')

const { TEXT_TYPE, TAG_TYPE } = require('../../constants/nodeTypes')

describe('Render dom', () => {

  it('example', () => {

    const parentDomNode = document.createElement('div')

    const templateNodes = [
      {
        type: TAG_TYPE,
        tag: 'div',
        props: { id: 1 },
        childs: []
      },
      {
        type: TAG_TYPE,
        tag: 'div',
        props: { id: 2 },
        childs: [
          {
            type: TEXT_TYPE,
            text: 'hello world',
          },
          {
            type: TAG_TYPE,
            tag: 'div',
            props: { id: '2.1' },
            childs: []
          },
        ]
      },
      {
        type: TAG_TYPE,
        tag: 'div',
        props: { id: 3 },
        childs: []
      },
    ]

    const newLiveNodes = render(parentDomNode, [], templateNodes)

    expect(parentDomNode.childNodes[0].id).toBe('1')
    expect(parentDomNode.childNodes[1].id).toBe('2')
    expect(
      parentDomNode.childNodes[1].childNodes[0].textContent
    ).toBe('hello world')
    expect(parentDomNode.childNodes[1].childNodes[1].id).toBe('2.1')
    expect(parentDomNode.childNodes[2].id).toBe('3')


  })

})
