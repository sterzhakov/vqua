const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')
const convertTag = require('../convertTag')

describe('Convert vqua tag to string', () => {

  it('closed tag', () => {

    const node = {
      type: TAG_TYPE,
      tag: 'div',
      props: { id: 'test', class: 'test', onClick: () => {} },
      childs: []
    }

    const string = convertTag(node, 'text 1')

    expect(string).toBe(
      '<div id="test" class="test">text 1</div>'
    )

  })

  it('single tag', () => {

    const node = {
      type: TAG_TYPE,
      tag: 'img',
      props: { src: 'test.jpg', onClick: () => {} },
      childs: []
    }

    const string = convertTag(node)

    expect(string).toBe(
      '<img src="test.jpg">'
    )

  })

})
