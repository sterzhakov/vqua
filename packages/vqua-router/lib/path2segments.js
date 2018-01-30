module.exports = (path) => {

  if (typeof path != 'string') return path

  const boundarySlashes = /^\/+|\/+$/g

  return path.replace(boundarySlashes, '').split('/')

}
