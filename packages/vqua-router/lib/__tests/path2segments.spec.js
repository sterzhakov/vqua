const path2segments = require('../path2segments')

describe('Path to segments', () => {

  it('slash segment', () => {

    expect(
      path2segments('/')
    ).toEqual([
      ''
    ])

  })

  it('single segment with first symbol slash', () => {

    expect(
      path2segments('posts')
    ).toEqual([
      'posts'
    ])

  })

  it('single segment without first symbol slash', () => {

    expect(
      path2segments('/posts')
    ).toEqual([
      'posts'
    ])

  })

  it('double segment', () => {

    expect(
      path2segments('/posts/:id')
    ).toEqual([
      'posts',
      ':id'
    ])

  })

})
