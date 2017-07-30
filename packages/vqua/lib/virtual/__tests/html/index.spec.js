const { TAG_TYPE, TEXT_TYPE } = require('../../../constants/nodeTypes')
const html = require('../../html')

describe('Html helpers', () => {

  it('create template node from div helper', () => {

    const { div } = html

    expect(
      div({ id: 1, ref: 'div' }, 'test')
    ).toEqual({
      type: TAG_TYPE,
      tag: 'div',
      props: { id: 1 },
      ref: 'div',
      childs: [
        'test'
      ]
    })

  })

  it('create template node from h helper', () => {

    const { h } = html

    expect(
      h('div', { id: 1, ref: 'div' }, ['test'])
    ).toEqual({
      type: TAG_TYPE,
      tag: 'div',
      props: { id: 1 },
      ref: 'div',
      childs: [
        'test'
      ]
    })

  })

})
