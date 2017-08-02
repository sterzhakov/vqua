const context = require.context('../build', true, /\.Spec.js$/)
context.keys().forEach(context)
