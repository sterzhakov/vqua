const app =
  createServer({
    routes: [],
    layout: (html, data) => '',
    publicPath: './dist',
    containerPath: './build/containers',
  })

app.listen(8080)
