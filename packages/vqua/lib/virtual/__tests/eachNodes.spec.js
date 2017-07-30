const eachNodes = require('../eachNodes')

describe('Virtual tree iterate', () => {

  it('call function at each iteration', () => {

    const virtualTree = {
      name: 'div',
      props: {},
      childs: [
        'example',
        {
          name: new Object,
          props: {},
          childs: [
            {
              name: Object,
              props: {},
              childs: []
            },
          ]
        },
        'example',
      ]
    }

    const assertions = [
      (element, level) => {
        return level == 0 && element.name == 'div'
      },
      (element, level) => {
        return level == 1 && element == 'example'
      },
      (element, level) => {
        return level == 1 && element.name instanceof Object
      },
      (element, level) => {
        return level == 2 && element.name == Object
      },
      (element, level) => {
        return level == 1 && element == 'example'
      },

    ]

    eachNodes(virtualTree, (virtualElement, level, index) => {

      expect(
        assertions[index](virtualElement, level)
      ).toBe(true)

    })

  })

})
