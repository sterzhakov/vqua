[← back](https://github.com/sterjakovigor/vqua/tree/master/packages/vqua)

# Vqua2string

Tranform vqua nodes to string

## Example

```javascript

  const vqua2string = require('vqua2string')

  const nodes = [
    {
      type: TAG_TYPE,
      tag: 'div',
      props: {},
      childs: []
    }
  ]

  const string = vqua2string(nodes)

  // string =>
  //
  // '<div></div>'

```
