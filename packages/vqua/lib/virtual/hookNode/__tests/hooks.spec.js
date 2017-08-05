const {
  callBeforeMount, callBeforeUnmount, callBeforeUpdate,
  callAfterMount, callAfterUpdate
} = require('../../hookNode/hooks')

const Component = require('../../Component')

describe('Instance hooks', () => {

  it('call before mount', () => {

    const instance = {
      beforeMount: () => {}
    }

    spyOn(instance, 'beforeMount').and.callThrough()

    callBeforeMount(instance)

    expect(instance.beforeMount).toHaveBeenCalled()

  })

  it('call before update', () => {

    const instance = {
      beforeUpdate: () => {}
    }

    spyOn(instance, 'beforeUpdate').and.callThrough()

    callBeforeUpdate(instance, 1, 2, 3)

    expect(
      instance.beforeUpdate.calls.allArgs()
    ).toEqual([[1,2,3]])

  })

  it('call before unmount', () => {

    const instance = {
      beforeUnmount: () => {}
    }

    spyOn(instance, 'beforeUnmount').and.callThrough()

    callBeforeUnmount(instance)

    expect(instance.beforeUnmount).toHaveBeenCalled()

  })

  it('call after mount', () => {

    const instance = {
      afterMount: () => {}
    }

    spyOn(instance, 'afterMount').and.callThrough()

    callAfterMount(instance)

    expect(instance.afterMount).toHaveBeenCalled()

  })

  it('call after update', () => {

    const instance = {
      afterUpdate: () => {}
    }

    spyOn(instance, 'afterUpdate').and.callThrough()

    callAfterUpdate(instance, 1, 2, 3)

    expect(
      instance.afterUpdate.calls.allArgs()
    ).toEqual([[1, 2, 3]])

  })

})
