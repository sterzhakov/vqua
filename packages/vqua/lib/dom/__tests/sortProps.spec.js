const sortProps = require('../sortProps')

describe('Sort props', () => {

  it('for element props', () => {

    const elementProps = {
      id: 'orange',
      style: 'color: orange',
    }

    expect(
      sortProps(elementProps)
    ).toEqual({
      elementProps: elementProps,
      eventProps: {}
    })

  })

  it('for event props', () => {

    const eventProps = {
      onClick: () => { return true },
      onKeyDown: () => { return true }
    }

    expect(
      sortProps(eventProps)
    ).toEqual({
      elementProps: {},
      eventProps: eventProps,
    })

  })

})
