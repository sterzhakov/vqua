[← back](https://github.com/sterjakovigor/vqua/tree/master/packages/vqua)

# Html2vqua

Transfrom html string to vqua nodes

## Example

```javascript

  const html2vqua = require('html2vqua')

  const div = document.createElement('<div></div>')

  const node = html2vqua(div)

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
