module.exports = (text, params) => {

  const letters = [ ...text ]

  const data = letters.reduce((data, letter, index) => {

    const prevLetter = { prevLetter: letter }

    const letterPair = data.prevLetter + letter

    if (letterPair == '{{') {

      const items = data.string.length > 0
        ? [ ...data.items, data.string.slice(0, -1) ]
        : data.items

      return Object.assign({}, data, prevLetter, {
        prevLetter,
        isVariable: true,
        string: '',
        items
      })

    } else

    if (letterPair == '}}') {

      const key = data.string.slice(0, -1).trim()

      const items = data.string.length > 0 && key in params
        ? [ ...data.items, params[key] ]
        : data.items

      return Object.assign({}, data, prevLetter, {
        isVariable: false,
        string: '',
        items,
      })

    } else

    if (index == letters.length - 1) {

      const lastItem = data.string + letter

      const items = [ ...data.items, lastItem ]

      return Object.assign({}, data, prevLetter, { items })

    } else {

      const string = data.string + letter

      return Object.assign({}, data, prevLetter, { string })

    }

  }, {
    string: '',
    prevLetter: '',
    isVariable: false,
    items: []
  })

  return data.items

}
