const filterDomNodes = require('../filterDomNodes')
const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, INSTANCE_TYPE, CLASS_TYPE
} = require('../../constants/nodeTypes')

describe('Get virtual DOM elements:', () => {

  it('pass parent instance to all nodes', () => {

    const nodes = [
      {
        type: INSTANCE_TYPE,
        instance: { id: 1 },
        childs: [
          {
            type: TAG_TYPE,
            id: 1,
            childs: [
              {
                type: INSTANCE_TYPE,
                instance: { id: 2 },
                childs: [
                  {
                    id: 2,
                    type: TAG_TYPE,
                    childs: [
                      {
                        id: 3,
                        type: TEXT_TYPE,
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    const domNodes = filterDomNodes(nodes)

    expect(domNodes[0].instance).toEqual({ id: 1 })
    expect(domNodes[0].childs[0].instance).toEqual({ id: 2 })
    expect(domNodes[0].childs[0].childs[0].instance).toEqual({ id: 2 })

  })

  it('by array', () => {

    const nodes = [
      {
        type: ROOT_TYPE,
        childs: [
          {
            type: INSTANCE_TYPE,
            childs: [
              {
                type: TAG_TYPE,
                tag: 'div',
                childs: [
                  {
                    type: INSTANCE_TYPE,
                    childs: [
                      {
                        type: TEXT_TYPE,
                        text: 'text',
                      },
                    ]
                  }
                ]
              },
            ]
          },
          {
            type: TAG_TYPE,
            text: 'div',
            childs: []
          },
        ]
      }
    ]

    const willBe = [
      {
        type: TAG_TYPE,
        tag: 'div',
        instance: null,
        childs: [
          {
            type: TEXT_TYPE,
            instance: null,
            text: 'text',
          },        ]
      },
      {
        type: TAG_TYPE,
        instance: null,
        text: 'div',
        childs: []
      },
    ]

    expect(
      filterDomNodes(nodes)
    ).toEqual(willBe)
  })

})
