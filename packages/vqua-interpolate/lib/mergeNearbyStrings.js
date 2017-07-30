module.exports = (items) => {

  return items.reduce((newItems, item, index) => {

    const lastNewItem = newItems[newItems.length - 1]

    const isLastItemsStrings = (
      typeof item == 'string' &&
      typeof lastNewItem == 'string'
    )

    if (isLastItemsStrings) {

      const newString = lastNewItem + items[index]

      return [ ...newItems.slice(0, -1), newString ]

    }

    return [ ...newItems, item ]

  }, [])

}
