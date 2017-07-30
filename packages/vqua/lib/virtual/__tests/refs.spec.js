const { addRef, removeRef } = require('../refs')

describe('Ref', () => {

  it('add', () => {

    let instance = {
      refs: {}
    }

    const node = {
      ref: {
        name: 'test',
        instance,
      }
    }

    addRef(node, { name: 'test', instance: node.ref.instance })

    expect(instance.refs.test).toBeTruthy()

  })

  it('remove', () => {

    let instance = {
      refs: {
        test: true
      }
    }

    const node = {
      ref: {
        name: 'test',
        instance,
      }
    }

    removeRef(node)

    expect(instance.refs.test).toBeUndefined()
  })

})
