const cleanSegments = require('../cleanSegments')

describe('cleanSegments()', () => {

  it('collapse empty string segments', () => {

    const routes = [
      { segments: [''] },
      { segments: ['',''] },
      { segments: ['','','segment'] },
      { segments: ['','segment'] },
    ]

    expect(
      cleanSegments(routes)
    ).toEqual([
      { segments: [''] },
      { segments: [''] },
      { segments: ['segment'] },
      { segments: ['segment'] },
    ])

  })

})
