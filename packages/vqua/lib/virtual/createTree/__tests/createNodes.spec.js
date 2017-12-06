const createNodes = require('../../createTree/createNodes')
const B = require('berries')
const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = require('../../../constants/nodeTypes')

describe('Create nodes:', () => {

  it('link parent nodes', () => {

    const templateNodes = [
      {
        id: 1,
        childs: [
          {
            id: 2,
            childs: [
              {
                id: 3,
                childs: []
              }
            ]
          }
        ]
      }
    ]


    const nodes =
      createNodes({
        liveNodes: templateNodes,
        templateNodes,
        createOptions: {
          linkParent: true
        },
        createNode: ({ templateNode, liveNode }) => {
          return {
            newLiveNode: { id: templateNode.id },
            templateChilds: templateNode.childs,
            liveChilds: liveNode.childs,
            isNeedChilds: true
          }
        }
      })

    expect(nodes[0].parent).toBe(null)
    expect(nodes[0].childs[0].parent.id).toBe(1)
    expect(nodes[0].childs[0].childs[0].parent.id).toBe(2)

    expect(nodes[0].childs[0].parent.childs[0].parent.id).toBe(1)


  })

  it('index nodes', () => {

    const templateNodes = [
      {
        id: 1,
        childs: [
          {
            id: 2,
            childs: []
          },
          {
            id: 3,
            childs: []
          },
        ]
      }
    ]

    const nodes =
      createNodes({
        liveNodes: templateNodes,
        templateNodes,
        createOptions: {
          index: true
        },
        createNode: ({ templateNode, liveNode }) => {
          return {
            newLiveNode: { id: templateNode.id },
            templateChilds: templateNode.childs,
            liveChilds: liveNode.childs,
            isNeedChilds: true
          }
        }
      })

    expect(nodes[0].index).toBe(0)
    expect(nodes[0].childs[0].index).toBe(0)
    expect(nodes[0].childs[1].index).toBe(1)

  })

  it('count dom nodes childs', () => {

    const templateNodes = [
      {
        type: TAG_TYPE,
        tag: 'div',
        props: {},
        childs: [
          {
            type: TAG_TYPE,
            tag: 'div',
            props: {},
            childs: [
              {
                type: TAG_TYPE,
                tag: 'div',
                props: {},
                childs: []
              },
            ]
          },
          {
            type: TAG_TYPE,
            tag: 'div',
            props: {},
            childs: []
          },
        ]
      }
    ]

    const nodes =
      createNodes({
        liveNodes: templateNodes,
        templateNodes,
        createOptions: {
          childDomNodesCount: true
        },
        createNode: ({ templateNode, liveNode }, callback) => {
          return {
            newLiveNode: { type: templateNode.type },
            templateChilds: templateNode.childs,
            liveChilds: liveNode.childs,
            isNeedChilds: true
          }
        }
      })

    expect(nodes[0].childDomNodesCount).toBe(2)
    expect(nodes[0].childs[0].childDomNodesCount).toBe(1)
    expect(nodes[0].childs[0].childs[0].childDomNodesCount).toBe(0)
    expect(nodes[0].childs[1].childDomNodesCount).toBe(0)

  })

  it('filter nodes', () => {

    const nodes =
      createNodes({
        liveNodes: [1, 2],
        templateNodes: [1, 2],
        createNode: ({ liveNode, templateNode }, callback) => {
          return { newLiveNode: [ liveNode, templateNode ] }
        },
        filterNodes: (liveNodes, templateNodes) => {
          return {
            filteredLiveNodes: liveNodes.reverse(),
            filteredTemplateNodes: templateNodes.reverse(),
          }
        }
      })

    expect(nodes).toEqual([[2,2], [1, 1]])

  })

  it('filter nodes with liveParentInstanceNode param', () => {

    const nodes =
      createNodes({
        liveNodes: [1, 2],
        templateNodes: [1, 2],
        liveParentInstanceNode: {},
        createNode: ({ liveNode, templateNode }, callback) => {
          return { newLiveNode: [ liveNode, templateNode ] }
        },
        filterNodes: (liveNodes, templateNodes, liveParentInstanceNode) => {
          return {
            filteredLiveNodes: [liveParentInstanceNode],
            filteredTemplateNodes: [liveParentInstanceNode],
          }
        }
      })

    expect(nodes).toEqual([[{}, {}]])

  })

  it('pass context to childrens', () => {

    const templateNodes = [
      {
        passContext: { one: 1 },
        childs: [
          {
            passContext: { two: 2 }
          },
          {
            passContext: { two: 2 },
            childs: [
              {
                passContext: { three: 3 }
              },
            ]
          }
        ]
      }
    ]

    const nodes =
      createNodes({
        liveNodes: templateNodes,
        templateNodes,
        createNode: ({ templateNode, liveNode, context }) => {

          const node = Object.assign({}, templateNode.passContext, context)

          return {
            newLiveNode: node,
            isNeedChilds: templateNode.hasOwnProperty('childs'),
            newContext: B.omit(node, 'childs'),
            liveChilds: liveNode.childs,
            templateChilds: templateNode.childs,
          }

        }
      })

    expect(nodes).toEqual([
      {
        one: 1,
        childs: [
          {
            one: 1,
            two: 2,
          },
          {
            one:   1,
            two:   2,
            childs: [
              {
                one:   1,
                two:   2,
                three: 3,
              }
            ]
          },
        ]
      }
    ])

  })

  it('create array of numbers', () => {

    const nodes =
      createNodes({
        liveNodes: [1, 2, 3],
        templateNodes: [3, 2, 1],
        createNode: ({ liveNode, templateNode }, callback) => {
          return { newLiveNode: liveNode + templateNode }
        },
      })

    expect(nodes).toEqual([4, 4, 4])

  })

  it('array of objects without childs', () => {

    const templateNodes = [
      {
        tag: 'div',
        childs: [
          {
            tag: 'div'
          },
        ]
      }
    ]

    const nodes =
      createNodes({
        liveNodes: templateNodes,
        templateNodes,
        createNode: ({ templateNode }, callback) => {
          return {
            newLiveNode: { tag: templateNode.tag }
          }
        }
      })

    expect(nodes).toEqual([{ tag: 'div' }])

  })

  it('array of objects with childs', () => {

    const templateNodes = [
      { tag: 'div', childs: [
        { tag: 'div', childs: [
          { tag: 'div', childs: [] },
        ] },
        { tag: 'div', childs: [
          { tag: 'div', childs: [] },
          { tag: 'div', childs: [] },
        ] },
        { tag: 'div', childs: [
          { tag: 'div', childs: [] },
        ] },
      ] }
    ]

    const nodes =
      createNodes({
        liveNodes: templateNodes,
        templateNodes,
        createNode: ({ templateNode, liveNode }, callback) => {
          return {
            newLiveNode: { tag: templateNode.tag },
            templateChilds: templateNode.childs,
            liveChilds: liveNode.childs,
            isNeedChilds: true
          }
        }
      })

    expect(nodes).toEqual(templateNodes)

  })

  it('empty array', () => {

    const nodes =
      createNodes({
        liveNodes: [],
        templateNodes: []
      })

    expect(nodes).toEqual([])

  })


})
