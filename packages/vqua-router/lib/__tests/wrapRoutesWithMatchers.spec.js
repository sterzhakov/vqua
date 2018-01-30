const wrapRoutesWithMatchers = require('../wrapRoutesWithMatchers')

describe('wrapRoutesWithMatchers()', () => {

  it('wrap segment string with matcher object', () => {

    const routes = [
      {
        segments: ['hello','!example'],
        childs: [
          {
            segments: ['hello'],
            childs: []
          },
          {
            segments: ['hello', '!example'],
            childs: []
          },
        ]
      }
    ]

    const matchers = {
      example: {
        key: 'example'
      }
    }

    expect(
      wrapRoutesWithMatchers(routes, matchers)
    ).toEqual([
      {
        segments: ['hello', matchers.example],
        childs: [
          {
            segments: ['hello'],
            childs: []
          },
          {
            segments: ['hello', matchers.example],
            childs: []
          },
        ]
      }
    ])

  })

})
