const diffProps = require('../diffProps')
const isPropsEqual = require('../isPropsEqual')

describe('Get props diff for', () => {

  it('addProps props for string, number, boolean', () => {

    expect(
      diffProps(
        {
          a: 'a',
          b: 1,
          c: true,
        },
        {
          a: 'b',
          b: 2,
          c: false,
        },
        isPropsEqual
      )
    ).toEqual({
      addProps: [
        { key: 'a', value: 'b' },
        { key: 'b', value: 2 },
        { key: 'c', value: false },
      ],
      removeProps: []
    })

  })

  it('addProps props for function', () => {

    const propsDiff = diffProps(
      {
        a: () => true
      },
      {
        a: () => false
      },
      isPropsEqual
    )

    expect(
      propsDiff.addProps[0].value.toString()
    ).toEqual(
      '() => false'
    )

  })

  it('delete props for string, number, boolean', () => {

    expect(
      diffProps(
        {
          a: 'a',
          b: 1,
          c: true,
        },
        {},
        isPropsEqual
      )
    ).toEqual({
      addProps: [],
      removeProps: [
        { key: 'a', value: 'a' },
        { key: 'b', value: 1 },
        { key: 'c', value: true },
      ]
    })

  })

  it('delete props for function', () => {

    const propsDiff =
      diffProps(
        {
          a: () => true
        },
        {},
        isPropsEqual
      )

    expect(
      propsDiff.removeProps[0].value.toString()
    ).toEqual(
      '() => true'
    )

  })



})
