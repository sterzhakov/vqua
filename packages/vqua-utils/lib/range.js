module.exports = (start, end) => {

  if (start == end) return [start]

  const create = start < end
    ? (number, index) => start + index
    : (number, index) => start - index

  return (
    Array.from(
      Array(
        Math.abs(start - end) + 1
      )
    )
    .map(create)
  )

}
