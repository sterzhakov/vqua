const B = require('berries')

module.exports = (leftProp, rightProp) => {

  const left = {
    prop: leftProp,
    type: B.kindOf(leftProp)
  }

  const right = {
    prop: rightProp,
    type: B.kindOf(rightProp)
  }

  if (left.type == right.type) {

    switch (left.type) {

      case 'function': {

        return false

        break
      }

      default: {

        return left.prop == right.prop

      }

    }

  } else {

    return false

  }


}
