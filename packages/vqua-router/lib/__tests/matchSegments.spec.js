const matchSegments = require('../matchSegments')

describe('Match segments:', () => {

  it('match all segments', () => {

    expect(
      matchSegments(
        ['*'],
        ['posts', '2']
      )
    ).toBe(true)

  })

  it('match string segments', () => {

    expect(
      matchSegments(
        ['posts', 'all'],
        ['posts', 'all']
      )
    ).toBe(true)

  })

  it('doesnt\'t match string segments', () => {

    expect(
      matchSegments(
        ['posts', 'all'],
        ['posts', 'one']
      )
    ).toBe(false)

  })

  it('match segments with variable', () => {

    expect(
      matchSegments(
        ['posts', ':id'],
        ['posts', '2']
      )
    ).toBe(true)

  })

  it('doesn\'t match segments with variable', () => {

    expect(
      matchSegments(
        ['posts', ':id'],
        ['posts', '2', 'category']
      )
    ).toBe(false)

  })

  it('match function', () => {

    const matcher = {
      match: segments => segments[1] == '2'
    }

    expect(
      matchSegments(
        matcher,
        ['posts', '2']
      )
    ).toBe(true)

  })

  it('doesn\'t match function', () => {

    const matcher = {
      match: segments => segments[1] == '2'
    }

    expect(
      matchSegments(
        [matcher],
        ['posts', '3']
      )
    ).toBe(false)

  })

})
