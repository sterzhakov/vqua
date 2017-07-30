const {
  TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = require('../../constants/nodeTypes')

const isNodeForUnmount = require('../isNodeForUnmount')

describe('Is node for unmount for', () => {

  it('return false for unknow node type', () => {
    expect(
      isNodeForUnmount(
        {
          type: 123,
        },
        {
          type: TEXT_TYPE
        }
      )
    ).toBe(false)
  })

  describe('live text', () => {

    it('template text with same text', () => {
      expect(
        isNodeForUnmount(
          {
            type: TEXT_TYPE,
            text: 'example',
          },
          {
            type: TEXT_TYPE,
            text: 'example',
          }
        )
      ).toBe(false)
    })

    it('template text with different text', () => {
      expect(
        isNodeForUnmount(
          {
            type: TEXT_TYPE,
            text: 'example',
          },
          {
            type: TEXT_TYPE,
            text: 'example 2',
          }
        )
      ).toBe(true)
    })

    it('template tag', () => {
      expect(
        isNodeForUnmount(
          {
            type: TEXT_TYPE,
          },
          {
            type: TAG_TYPE,
          }
        )
      ).toBe(true)
    })

    it('template class', () => {

      class App {}

      expect(
        isNodeForUnmount(
          {
            type: TEXT_TYPE,
          },
          {
            type: CLASS_TYPE,
            class: App,
          }
        )
      ).toBe(true)
    })

  })

  describe('live tag', () => {

    it('template text', () => {
      expect(
        isNodeForUnmount(
          {
            type: TAG_TYPE,
          },
          {
            type: TEXT_TYPE,
          }
        )
      ).toBe(true)
    })

    it('template same tag', () => {
      expect(
        isNodeForUnmount(
          {
            type: TAG_TYPE,
            tag: 'p',
          },
          {
            type: TAG_TYPE,
            tag: 'p',
          }
        )
      ).toBe(false)
    })

    it('template different tag', () => {
      expect(
        isNodeForUnmount(
          {
            type: TAG_TYPE,
            tag: 'p',
          },
          {
            type: TAG_TYPE,
            tag: 'div',
          }
        )
      ).toBe(true)
    })

    it('template class', () => {
      expect(
        isNodeForUnmount(
          {
            type: TAG_TYPE,
          },
          {
            type: CLASS_TYPE,
          }
        )
      ).toBe(true)
    })

  })

  describe('live instance', () => {

    it('template text', () => {
      expect(
        isNodeForUnmount(
          {
            type: INSTANCE_TYPE,
          },
          {
            type: TEXT_TYPE,
          }
        )
      ).toBe(true)
    })

    it('template tag', () => {
      expect(
        isNodeForUnmount(
          {
            type: INSTANCE_TYPE,
          },
          {
            type: TAG_TYPE,
          }
        )
      ).toBe(true)
    })

    it('template same class', () => {

      class App {}

      expect(
        isNodeForUnmount(
          {
            type: INSTANCE_TYPE,
            instance: new App,
          },
          {
            type: CLASS_TYPE,
            class: App,
          }
        )
      ).toBe(false)
    })

    it('template different class', () => {

      class App {}
      class App2 {}

      expect(
        isNodeForUnmount(
          {
            type: INSTANCE_TYPE,
            instance: new App,
          },
          {
            type: CLASS_TYPE,
            class: App2,
          }
        )
      ).toBe(true)
    })

  })

})
