const clone = require('..//clone')

describe('Util', () => {

  it('clone object', () => {

    const object = {
      name: 'Trololo',
      props: {
        color: 'green',
        posts: [
          { id: 1, name: 'Hello world!' }
        ]
      },
      childrens: [
        'ololo',
        {
          name: 'div',
          props: {},
          childrens: []
        }
      ]
    }

    const clonedObject = clone(object)

    object.name = ''
    object.props.color = ''
    object.props.posts.id = ''
    object.props.posts.name = ''
    object.childrens[0] = ''
    object.childrens[1].name = ''
    object.childrens[1].props.name = ''
    object.childrens[1].childrens[0] = ''

    expect(clonedObject).toEqual({
      name: 'Trololo',
      props: {
        color: 'green',
        posts: [
          { id: 1, name: 'Hello world!' }
        ]
      },
      childrens: [
        'ololo',
        {
          name: 'div',
          props: {},
          childrens: []
        }
      ]
    })
  })

})
