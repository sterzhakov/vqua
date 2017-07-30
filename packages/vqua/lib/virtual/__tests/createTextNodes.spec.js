const createTextNodes = require('../createTextNodes')
const { TAG_TYPE, TEXT_TYPE } = require('../../constants/nodeTypes')

describe('Create child nodes', () => {

  it('return one level nesting array with tag and text nodes', () => {

    const newNodes =
      createTextNodes([
        'test',
        {
          type: TAG_TYPE,
          tag: 'div',
          props: {},
          childs: []
        },
        false,
        true,
        123,
        undefined
      ])

    expect(newNodes).toEqual([
      {
        type: TEXT_TYPE,
        text: 'test',
        childs: []
      },
      {
        type: TAG_TYPE,
        tag: 'div',
        props: {},
        childs: []
      },
      {
        type: TEXT_TYPE,
        text: '',
        childs: []
      },
      {
        type: TEXT_TYPE,
        text: true,
        childs: []
      },
      {
        type: TEXT_TYPE,
        text: 123,
        childs: []
      },
      null
      ,
    ])

  })

})
