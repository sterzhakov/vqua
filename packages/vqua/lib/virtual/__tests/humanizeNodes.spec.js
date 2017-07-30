const humanizeNodes = require('../humanizeNodes')

const {
  TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = require('../../constants/nodeTypes')

describe('Humanize virtual tree', () => {

  it('valid string', () => {

    class App {

      constructor(props) {
        this.props = props
        this.state = { active: true }
      }

    }

    const virtualTree = [
      {
        type: TAG_TYPE,
        tag: 'div',
        props: { id: 1 },
        childs: [
          {
            type: TEXT_TYPE,
            text: 'Hello world!',
          },
          {
            type: TAG_TYPE,
            tag: 'div',
            props: { id: 2 },
            childs: [],
          },
          {
            type: CLASS_TYPE,
            class: App,
            props: { id: 3 },
            childs: [],
          },
          {
            type: INSTANCE_TYPE,
            instance: new App({ id: 4 }),
            childs: [],
          },
        ]
      },
    ]

    expect(
      humanizeNodes(virtualTree)
    ).toBe(
      'div({"id":1})\n' +
      '  Hello world!\n' +
      '  div({"id":2})\n' +
      '  App({"id":3})\n' +
      '  app({"id":4}) {"active":true}\n'
    )

  })


})
