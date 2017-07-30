module.exports = (html = '') => {
  return (
    '<html>' +
      '<head>' +
      '</head>' +
      '<body>' +
        '<div id="app">' +
          html +
        '</div>' +
        '<script src="/index.js" type="text/javascript"></script>' +
      '</body>' +
    '</html>'
  )
}
