const B = require('berries')

module.exports = (leftProps = {}, rightProps = {}, isPropsEqual) => {

  const keys = B.union(
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

      const isFunctions = (
        typeof leftProps[key] == 'function' &&
        typeof rightProps[key] == 'function'
      )

      const isEqual =
        isPropsEqual(
          leftProps[key],
          rightProps[key],
          isFunctions
        )

      if (!isEqual && isFunctions) {

        const addProps = [
          ...sortedProps.addProps,
          {
            key,
            value: rightProps[key]
          }
        ]

        const removeProps = [
          ...sortedProps.removeProps,
          {
            key,
            value: leftProps[key]
          }
        ]

        return { addProps, removeProps }

      } else

      if (!isEqual && !isFunctions) {

        const addProps = [
          ...sortedProps.addProps,
          {
            key,
            value: rightProps[key]
          }
        ]

        const removeProps = sortedProps.removeProps

        return { addProps, removeProps }

      } else {

        return sortedProps

      }

    }

  }, { addProps: [], removeProps: [] })

}
