const { kindOf } = require('vqua-utils')

module.exports = (leftProp, rightProp) => {

  const left = {
    prop: leftProp,
    type: kindOf(leftProp)
  }

  const right = {
    prop: rightProp,
    type: kindOf(rightProp)
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
