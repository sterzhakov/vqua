const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, INSTANCE_TYPE, CLASS_TYPE
} = require('../../constants/nodeTypes')

const Component = require('../Component')

const createLiveTree = require('../createTree')

const getParentNodes = require('../getParentNodes')

describe('Get instance update info', () => {

  it('array of numbers', () => {

    class App3 extends Component {

      render() {
        return null
      }

    }

    class App2 extends Component {

      render() {
        return [
          {
            type: TAG_TYPE,
            childs: []
          },
          // 2
          {
            type: TAG_TYPE,
            childs: [
              {
                type: TAG_TYPE,
                childs: []
              },
              {
                type: TAG_TYPE,
                childs: []
              },
              {
                type: TAG_TYPE,
                childs: []
              },
              // 3
              {
                type: CLASS_TYPE,
                class: App3,
                childs: []
              },
            ]
          },
        ]
      }

    }

    class App1 extends Component {

      render() {
        return [
          // 1
          {
            type: TAG_TYPE,
            childs: [
              {
                type: TAG_TYPE,
                childs: []
              },
              {
                type: CLASS_TYPE,
                class: App2,
              },
              {
                type: TAG_TYPE,
                childs: []
              },
            ]
          },
          {
            type: TAG_TYPE,
            childs: []
          },
        ]
      }

    }

    const templateNodes = [
      {
        type: ROOT_TYPE,
        liveRootDom: { name: 'liveRootDom' },
        childs: [
          {
            type: TAG_TYPE,
            childs: []
          },
          {
            type: CLASS_TYPE,
            class: App1,
          }
        ],
      }
    ]

    const newLiveNodes = createLiveTree([], templateNodes, {})

    const targetNode = (
      newLiveNodes[0].childs[1].childs[0].childs[1].childs[1].childs[3]
    )

    const parentNodes = getParentNodes(targetNode)

    expect(
      parentNodes.map(node => node.offset)
    ).toEqual([undefined, 1,2,3])

  })

})
