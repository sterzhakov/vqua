module.exports = (items, index) => {

  if (index >= 0) {

    return items[index]

  } else {

    return items[items.length + index]

  }

}
