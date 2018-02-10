const { inspect } = require('util')
const { html } = require('vqua')
const html2vqua = require('../index')

describe('Html to vqua', () => {

  it('return new array', () => {

    const string = `
      <p id='test' style='text-align: left;'>
        Hello world!
        <span>some text</span>
      </p>
    `

    const vquaNodes = html2vqua(string)

    expect(vquaNodes).toEqual([
      {
        type: 2,
        tag: 'p',
        props: { id: 'test', style: 'text-align: left;' },
        childs: [
          'Hello world!',
          {
            type: 2,
            tag: 'span',
            props: {},
            childs: [
              'some text'
            ]
          },
        ]
      }
    ])

  })

})
