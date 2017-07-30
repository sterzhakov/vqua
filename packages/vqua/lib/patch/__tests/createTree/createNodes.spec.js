const { omit } = require('vqua-utils')
const createNodes = require('../../createTree/createNodes')
const { TEXT_TYPE, TAG_TYPE } = require('../../../constants/nodeTypes')

describe('Create patch nodes', () => {

  it('filter nodes', () => {

    const allNodes = [
      { id: 1, childs: [] },
      { id: 2, childs: [] },
      { id: 3, childs: [] }
    ]

    const patchNodes =
      createNodes({
        limit: 0,
        domNodes: allNodes,
        liveNodes: allNodes,
        templateNodes: allNodes,
        filterNodes: (liveNodes, templateNodes) => {

          const compareNodes = (a, b) => a.id < b.id

          return {
            filteredLiveNodes: liveNodes.sort(compareNodes),
            filteredTemplateNodes: templateNodes.sort(compareNodes),
          }
        },
        createNode: ({ templateNode, liveNode }) => {
          return { templateNode, liveNode }
        },
      })

    expect(patchNodes).toEqual([
      {
        templateNode: { id: 3, childs: [] },
        liveNode: { id: 3, childs: [] },
        childs: [],
      },
      {
        templateNode: { id: 2, childs: [] },
        liveNode: { id: 2, childs: [] },
        childs: [],
      },
      {
        templateNode: { id: 1, childs: [] },
        liveNode: { id: 1, childs: [] },
        childs: [],
      },
    ])

  })

  it('call createNode for childs with all arguments', () => {

    const allNodes = [
      {
        type: TAG_TYPE,
        tag: 'div',
        childs: [
          {
            type: TAG_TYPE,
            tag: 'span',
            childs: [
              {
                type: TEXT_TYPE,
                text: 'text',
                childs: [],
              }
            ]
          },
          {
            type: TAG_TYPE,
            tag: 'p',
            childs: [],
          }
        ],
      }
    ]

    const patchNodes =
      createNodes({
        limit: 0,
        liveNodes: allNodes,
        templateNodes: allNodes,
        createNode: params => params,
      })

    expect(patchNodes).toEqual([
      {
        index: 0,
        limit: 0,
        offset: 0,
        liveNode: allNodes[0],
        templateNode: allNodes[0],
        childs: [
          {
            index: 0,
            limit: 2,
            offset: 0,
            liveNode: allNodes[0].childs[0],
            templateNode: allNodes[0].childs[0],
            childs: [
              {
                index: 0,
                limit: 1,
                offset: 0,
                liveNode: allNodes[0].childs[0].childs[0],
                templateNode: allNodes[0].childs[0].childs[0],
                childs: [],
              },
            ],
          },
          {
            index: 1,
            limit: 2,
            offset: 0,
            liveNode: allNodes[0].childs[1],
            templateNode: allNodes[0].childs[1],
            childs: [],
          },
        ]
      }
    ])


  })




  it('call createNode with last returned limit', () => {

    const allNodes = [{ childs: [] }, { childs: [] }, { childs: [] }]

    const patchNodes =
      createNodes({
        limit: 0,
        domNodes: allNodes,
        liveNodes: allNodes,
        templateNodes: allNodes,
        createNode: (params) => {
          return Object.assign({}, params, { nextLimit: params.index + 1 })
        },
      })

    expect(patchNodes[0].nextLimit).toBe(1)
    expect(patchNodes[1].nextLimit).toBe(2)
    expect(patchNodes[2].nextLimit).toBe(3)

  })

  it('call createNode with index argument', () => {

    const allNodes = [{ childs: [] }, { childs: [] }]

    const patchNodes =
      createNodes({
        domNodes: allNodes,
        liveNodes: allNodes,
        templateNodes: allNodes,
        createNode: params => params,
      })

      expect(patchNodes[0].index).toEqual(0)
      expect(patchNodes[1].index).toEqual(1)

  })

  it('call createNode with limit argument', () => {

    const allNodes = [{ childs: [] }, { childs: [] }]

    const patchNodes =
      createNodes({
        limit: 2,
        domNodes: allNodes,
        liveNodes: allNodes,
        templateNodes: allNodes,
        createNode: params => params,
      })

    expect(patchNodes[0].limit).toBe(2)
    expect(patchNodes[1].limit).toBe(2)


  })

  it('call createNode with offset argument', () => {

    const allNodes = [{ childs: [] }, { childs: [] }]

    const patchNodes =
      createNodes({
        offset: 2,
        domNodes: allNodes,
        liveNodes: allNodes,
        templateNodes: allNodes,
        createNode: params => params,
      })

    expect(patchNodes[0].offset).toBe(2)
    expect(patchNodes[1].offset).toBe(2)

  })

})
