module.exports = (html = '') => {
  return (
    '<html>' +
      '<head>' +
        '<meta charset="utf-8">' +
        '<link type="text/css" href="/index.css">' +
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
