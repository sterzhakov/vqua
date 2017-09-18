const separateRoutes = require('../separateRoutes')

describe('Separate routes', () => {

  it('create separate routes by nested routes', () => {

    const nestedRoutes = [
      {
        number: 1,
        segments: [ 'a' ],
        childs: [
          {
            number: 2,
            segments: [ 'b', 'c' ],
            childs: [
              {
                number: 3,
                segments: [ 'd' ],
                childs: [],
              },
            ],
          },
          {
            number: 4,
            segments: [ 'e' ],
            childs: [],
          },
        ]
      }
    ]

    const separatedRoutes = [
      {
        number: 1,
        segments: [ 'a' ],
      },
      {
        number: 2,
        segments: [ 'a', 'b', 'c' ],
      },
      {
        number: 3,
        segments: [ 'a', 'b', 'c', 'd' ],
      },
      {
        number: 4,
        segments: [ 'a', 'e' ],
      },
    ]

    expect(
      separateRoutes(nestedRoutes)
    ).toEqual(separatedRoutes)

  })

})
