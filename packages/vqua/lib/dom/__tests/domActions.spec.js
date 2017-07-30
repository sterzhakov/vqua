const { TEXT_TYPE, TAG_TYPE } = require('../../constants/nodeTypes')

const {
  updateProps,
  updateEventProps,
  updateElementProps,
  addElementProp,
  removeElementProp,
  addEventProp,
  removeEventProp,
  createElement,
  insertAt
} = require('../domActions')

describe('Dom actions', () => {

  it('Add element prop', () => {

    const domNode = document.createElement('div')
    addElementProp(domNode, { key: 'id', value: '1' })
    expect(domNode.id).toBe('1')

  })

  it('Remove element prop', () => {

    const domNode = document.createElement('div')
    domNode.id = 1
    removeElementProp(domNode, { key: 'id' })
    expect(domNode.id).toBe('')

  })

  it('Add event prop', () => {

    let id = 0

    const domNode = document.createElement('div')
    addEventProp(domNode, { key: 'onClick', value: () => { id = 1 } })
    domNode.click()
    expect(id).toBe(1)

  })

  it('Remove event prop', () => {

    let id = 0

    const handleClick = () => { id++ }

    const domNode = document.createElement('div')
    domNode.addEventListener('click', handleClick)
    domNode.click()
    expect(id).toBe(1)

    removeEventProp(domNode, { key: 'onClick', value: handleClick })
    domNode.click()
    expect(id).toBe(1)

  })

  it('Update element props', () => {

    const domNode = document.createElement('div')

    domNode.setAttribute('id', 1)
    domNode.setAttribute('class', 'test')

    updateElementProps(
      domNode,
      { id: 0, class: 'test' },
      { id: 1, class: false, selected: true }
    )

    expect(domNode.id).toBe('1')
    expect(domNode.className).toBe('')
    expect(domNode.getAttribute('selected')).toBe('')

  })


  it('Update event props', () => {

    let id = 0

    const domNode = document.createElement('div')

    updateEventProps(
      domNode,
      { onClick: () => { id = -1 } },
      { onClick: () => { id = 1 } }
    )

    domNode.click()

    expect(id).toBe(1)

  })

  it('Update only event props', () => {

    let id = 0

    const domNode = document.createElement('div')
    domNode.id = '0'

    updateProps(
      domNode,
      { id: 0 },
      { id: 1, onClick: () => { id = 1 } },
      { event: true, element: false }
    )

    domNode.click()

    expect(id).toBe(1)
    expect(domNode.id).toBe('0')

  })

  it('Update only element props', () => {

    let id = 0

    const domNode = document.createElement('div')
    domNode.id = '0'

    updateProps(
      domNode,
      { id: 0 },
      { id: 1, onClick: () => { id = 1 } },
      { event: false, element: true }
    )

    domNode.click()

    expect(id).toBe(0)
    expect(domNode.id).toBe('1')

  })

  it('Create tag element', () => {

    const domNode =
      createElement({
        type: TAG_TYPE,
        tag: 'div',
        props: { id: 1, class: 'test' }
      })

    expect(domNode.id).toBe('1')
    expect(domNode.className).toBe('test')
    expect(domNode.nodeType).toBe(1)

  })

  it('Create text element', () => {

    const domNode =
      createElement({
        type: TEXT_TYPE,
        text: 'test'
      })

    expect(domNode.nodeType).toBe(3)
    expect(domNode.textContent).toBe('test')

  })

  it('Insert at exisiting place', () => {

    const domNode = document.createElement('span')

    const parentDomNode = document.createElement('div')
    parentDomNode.appendChild( document.createElement('p') )
    parentDomNode.appendChild( document.createElement('p') )

    insertAt(domNode, parentDomNode, 1)

    expect(parentDomNode.childNodes[1].isSameNode(domNode)).toBe(true)

  })

  it('Insert at not exisiting place', () => {

    const domNode = document.createElement('span')

    const parentDomNode = document.createElement('div')

    insertAt(domNode, parentDomNode, 2)

    expect(parentDomNode.childNodes[0].isSameNode(domNode)).toBe(true)

  })

})
