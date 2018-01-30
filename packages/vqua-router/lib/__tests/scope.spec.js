const scope = require('../scope')

describe('scope()', () => {

  it('add to childs scope segments', () => {

    expect(
      scope(
        'admin',
        {
          segments: ['posts', ':id'],
          childs: []
        },
        {
          segments: ['favorites', ':id'],
          childs: []
        },
      )
    ).toEqual([
      {
        segments: ['admin', 'posts', ':id'],
        childs: []
      },
      {
        segments: ['admin', 'favorites', ':id'],
        childs: []
      },
    ])


  })

})
