[← back](https://github.com/sterjakovigor/vqua/tree/master/packages/vqua)

# Vqua interpolate

Replace variables from vqua text nodes.

## Example

```javascript

  const vquaInterpolate = require('vqua-interpolate')

  const nodes = [
    {
      type: TAG_TYPE,
      tag: 'div',
      props: {},
      childs: [
        'Hello {{ name }}, from {{ author }}!',
      ]
    }
  ]

  const interpolatedNodes =
    vquaInterpolate(nodes, {
      name: 'stranger',
      author: {
        type: TAG_TYPE,
        tag: 'span',
        props: {},
        childs: [
          'sun'
        ],
      }
    })

  // interpolatedNodes =>
  // 
  // {
  //   type: TAG_TYPE,
  //   tag: 'div',
  //   props: {},
  //   childs: [
  //     'Hello stranger, from ',
  //     {
  //       type: TAG_TYPE,
  //       tag: 'span',
  //       props: {},
  //       childs: [
  //         'sun'
  //       ],
  //     },
  //     '!',
  //   ]
  // }
```
