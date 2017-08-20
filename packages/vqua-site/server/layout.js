module.exports = (html = '', data = '') => {

  return (
    '<html>' +
      '<head>' +
        '<meta charset="utf-8">' +
        '<link rel="stylesheet" type="text/css" href="/index.css">' +
      '</head>' +
      '<body>' +
        '<div id="app">' +
          html +
        '</div>' +
        '<script id="app-data" type="application/json">' +
          data +
        '</script>' +
        '<script src="/index.js" type="text/javascript"></script>' +
      '</body>' +
    '</html>'
  )
}
