const mapNodes = require('../mapNodes')

describe('Map nodes', () => {

  it('skip null nodes', () => {

    const htmlNodes = {
      tag: 'div',
      child: [
        {
          tag: 'p',
        },
        {
          tag: 'span',
          child: []
        }
      ]
    }

    const newNodes = mapNodes(htmlNodes, (htmlNode) => {

      return (htmlNode.tag == 'span') ? null : { tag: htmlNode.tag }

    })

    expect(newNodes).toEqual({
      tag: 'div',
      childs: [
        {
          tag: 'p',
          childs: []
        },
      ]
    })

  })

  it('return new tree', () => {

    const htmlNodes = {
      tag: 'div',
      child: [
        {
          tag: 'p',
        },
        {
          tag: 'span',
          child: []
        }
      ]
    }

    const newNodes = mapNodes(htmlNodes, (htmlNode) => {

      return {
        tag: htmlNode.tag,
      }

    })

    expect(newNodes).toEqual({
      tag: 'div',
      childs: [
        {
          tag: 'p',
          childs: []
        },
        {
          tag: 'span',
          childs: []
        }
      ]
    })

  })

})
