const {
  isKeyedNode,
  getLivePairForTemplate,
  wrapNodesWithTheirKeys,
  sortUsedLiveNodes,
  sortUnusedLiveNodes,
  sortLiveNodes,
  sortTemplateNodes,
  separateLiveNodes,
} = require('../sortNodes')

describe('Sort nodes:', () => {

  describe('sort live nodes', () => {

    it('by empty template nodes', () => {

      const liveNodes = [
        { text: 'hello' },
        { tag: 'div', key: 1 },
        { tag: 'div', key: 3 },
      ]

      const templateNodes = []

      expect(
        sortLiveNodes(liveNodes, templateNodes)
      ).toEqual([
        { text: 'hello' },
        { tag: 'div', key: 1 },
        { tag: 'div', key: 3 },
      ])

    })

    it('by template nodes', () => {

      const liveNodes = [
        { text: 'hello' },
        { tag: 'div', key: 1 },
        { tag: 'div', key: 3 },
      ]

      const templateNodes = [
        { text: 'hola' },
        { text: 'bonjour' },
        { tag: 'div', key: 2 },
        { tag: 'div', key: 1 },
        { text: 'hello world'},
      ]

      const sortedLiveNodes = sortLiveNodes(liveNodes, templateNodes)

      expect(sortedLiveNodes[0].text).toEqual('hello')
      expect(sortedLiveNodes[1]).toEqual(null)
      expect(sortedLiveNodes[2]).toEqual(null)
      expect(sortedLiveNodes[3].key).toEqual(1)
      expect(sortedLiveNodes[4]).toEqual(null)
      expect(sortedLiveNodes[5].key).toEqual(3)

    })

  })

  describe('sort template nodes', () => {

    it('flatten and remove null values from array', () => {
      expect(
        sortTemplateNodes([
          null,
          [
            { text: 'hello' },
            [null],
          ],
          { text: 'world' }
        ])
      ).toEqual([
        { text: 'hello' },
        { text: 'world' }
      ])
    })

  })

  describe('sort live nodes', () => {

    describe('sort used live nodes', () => {

      it('when used exists', () => {

        const liveNodes = [
          { tag: 'div' },
          { tag: 'div', key: 1 },
          'text',
          { tag: 'div', key: 2 },
        ]
        const templateNodes = [
          'text',
          { tag: 'div' },
          { tag: 'div', key: 2 },
          'text',
          { tag: 'div', key: 1 },
        ]
        const keyedLiveNodes = wrapNodesWithTheirKeys(liveNodes)

        expect(
          sortUsedLiveNodes({ liveNodes, templateNodes, keyedLiveNodes })
        ).toEqual([
          { tag: 'div' },
          null,
          { tag: 'div', key: 2 },
          null,
          { tag: 'div', key: 1 },
        ])
      })

    })

    describe('sort unused live nodes', () => {

      it('when unused exists', () => {

        const liveNodes = [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
        ]

        const usedLiveIds = [1,3]

        expect(
          sortUnusedLiveNodes({
            liveNodes, usedLiveIds
          })
        ).toEqual([
          { id: 2 },
          { id: 4 },
        ])

      })

    })

  })

  describe('find live pair for template', () => {

    it('when ', () => {

      const liveNode = { tag: 'p' }
      const templateNode = null
      const keyedLiveNodes = {}

      expect(
        getLivePairForTemplate(liveNode, templateNode, keyedLiveNodes)
      ).toBe(null)

    })

    it('when template node doesn\'t keyed and live is keyed', () => {
      const liveNode = { tag: 'p', key: 1 }
      const templateNode = { tag: 'div' }
      const keyedLiveNodes = {}

      expect(
        getLivePairForTemplate(liveNode, templateNode, keyedLiveNodes)
      ).toEqual(
        null
      )
    })

    it('when live keyed node exists', () => {

      const liveNode = { tag: 'p' }
      const templateNode = { tag: 'div', key: 1 }
      const keyedLiveNodes = { 1: { tag: 'div', key: 1 } }

      expect(
        getLivePairForTemplate(liveNode, templateNode, keyedLiveNodes)
      ).toEqual(
        { tag: 'div', key: 1 }
      )
    })

    it('when live keyed node doesn\'t exists', () => {

      const liveNode = { tag: 'p' }
      const templateNode = { tag: 'div', key: 1 }
      const keyedLiveNodes = { 2: { tag: 'div', key: 1 } }

      expect(
        getLivePairForTemplate(liveNode, templateNode, keyedLiveNodes)
      ).toEqual(
        null
      )
    })

    it('when template node is not keyed ', () => {

      const liveNode = { tag: 'p' }
      const templateNode = { tag: 'div' }
      const keyedLiveNodes = {}

      expect(
        getLivePairForTemplate(liveNode, templateNode, keyedLiveNodes)
      ).toEqual(
        { tag: 'p' }
      )
    })

  })

  describe('is keyed node', () => {

    it('for element with key props', () => {
      expect(
        isKeyedNode(
          { tag: 'div', key: 1 }
        )
      ).toBe(true)
    })

    it('for element without key props', () => {
      expect(
        isKeyedNode(
          { tag: 'div' }
        )
      ).toBe(false)
    })

    it('for element without key props', () => {
      expect(
        isKeyedNode(
          null
        )
      ).toBe(false)
    })

  })

  describe('wrap nodes with keys', () => {

    it('when keyed nodes exists', () => {
      expect(
        wrapNodesWithTheirKeys([
          null,
          { tag: 'span',        },
          { tag: 'div',  key: 1 },
          'text',
          { tag: 'p',    key: 2 }
        ])
      ).toEqual({
        1: { tag: 'div',  key: 1 },
        2: { tag: 'p',    key: 2 }
      })
    })

    it('when keyed nodes doesn\'t exists', () => {
      expect(
        wrapNodesWithTheirKeys([
          null,
          'text',
        ])
      ).toEqual({})
    })


  })

})
