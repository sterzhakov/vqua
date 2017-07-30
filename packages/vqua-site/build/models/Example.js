module.exports = {

  all: ({ locale, name, raw } = {}) => {

    const context = raw
      ? require.context('raw-loader!../examples/', true, /\.(js|sh|html)$/)
      : require.context('../examples/', true, /\.preview\.js$/)

    return context.keys().reduce((examples, pathName) => {

      const anyExtension = /^\.[\w]+$/g

      const extension = pathName.match(/\.[^.]+$/)[0]

      const segments = pathName.slice(2, -extension.length).split(/_|\./)

      if (segments[0] == name) {

        const example = {
          name: segments[1],
          content: context(pathName),
          articleName: segments[0],
          pathName,
          extension,
        }

        return [ ...examples, example ]

      }

      return examples

    }, [])

  }

}
