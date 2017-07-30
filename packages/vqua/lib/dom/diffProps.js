const { union } = require('vqua-utils')
const isPropsEqual = require('./isPropsEqual')

module.exports = (leftProps = {}, rightProps = {}) => {

  const keys = union(
    Object.keys(leftProps),
    Object.keys(rightProps)
  )

  return keys.reduce((sortedProps, key) => {

    if (leftProps.hasOwnProperty(key) && !rightProps.hasOwnProperty(key)) {

      return {
        addProps: sortedProps.addProps,
        removeProps: [
          ...sortedProps.removeProps,
          { key, value: leftProps[key] }
        ],
      }

    } else

    if (!leftProps.hasOwnProperty(key) && rightProps.hasOwnProperty(key)) {

      return {
        addProps: [
          ...sortedProps.addProps,
          { key, value: rightProps[key] }
        ],
        removeProps: sortedProps.removeProps,
      }

    } else {

      const addProps = (
        isPropsEqual(leftProps[key], rightProps[key])
          ? sortedProps.addProps
          : [
              ...sortedProps.addProps,
              { key, value: rightProps[key] }
            ]
      )

      return {
        addProps,
        removeProps: sortedProps.removeProps,
      }

    }

  }, { addProps: [], removeProps: [] })

}
