[← back](https://github.com/sterjakovigor/vqua/tree/master)

# Dom2vqua

Transfrom dom nodes to vqua nodes

## Example

```javascript

  const dom2vqua = require('dom2vqua')

  const div = document.createElement('div')

  const node = dom2vqua(div)

  // node =>
  //
  // {
  //   dom: div,
  //   type: TAG_TYPE,
  //   tag: 'div',
  //   props: {},
  //   childs: []
  // },

```
