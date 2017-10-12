/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
  ROOT_TYPE:     0,
  TEXT_TYPE:     1,
  TAG_TYPE:      2,
  CLASS_TYPE:    3,
  INSTANCE_TYPE: 4,
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const { TAG_TYPE } = __webpack_require__(0)

module.exports = (node) => {

  const propsParams = {

    props: Array.from(node.attributes).reduce((props, attribute) => {

      return Object.assign({}, props, {
        [attribute.nodeName]: node.getAttribute(attribute.nodeName)
      })

    }, {})

  }

  const keyParams = 'data-vqua-key' in propsParams.props
    ? { key: propsParams.props['data-vqua-key'] }
    : {}

  return (
    Object.assign({}, propsParams, keyParams, {
      type: TAG_TYPE,
      tag: node.tagName.toLowerCase(),
      dom: node,
    })
  )

}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { TEXT_TYPE } = __webpack_require__(0)

module.exports = (node) => {

  return {
    type: TEXT_TYPE,
    text: node.textContent,
    dom: node,
  }

}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const div = document.createElement('div')

const span = document.createElement('span')

const text1 = document.createTextNode('text 1')

const text2 = document.createTextNode('text 2')

const text3 = document.createTextNode('text 3')

div.appendChild(text1)
div.appendChild(span)
span.appendChild(text2)
div.appendChild(text3)

span.setAttribute('id', 'id')
span.setAttribute('class', 'class')

module.exports = div


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const loop = (node, createNode) => {

  if (node.nodeType == undefined) {

    return Array.from(node).map((node) => {

      return loop(node, createNode)

    })

  } else {

    const newNode = createNode(node)

    if (typeof newNode == 'object') {

      const childs = loop(node.childNodes, createNode)

      return Object.assign({}, newNode, { childs })

    } else

    if (typeof newNode == 'string') {

      return newNode

    } else {

      return null

    }

  }

}


module.exports = loop


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const context = __webpack_require__(6)
context.keys().forEach(context)


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./__tests/convertTag.spec.js": 7,
	"./__tests/convertText.spec.js": 8,
	"./__tests/index.spec.js": 9,
	"./__tests/mapNodes.spec.js": 11
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const convertTag = __webpack_require__(1)
const { TAG_TYPE } = __webpack_require__(0)

describe('Convert tag', () => {

  fit('return new object', () => {

    const tag = document.createElement('div')
    tag.setAttribute('class', 'class')
    tag.setAttribute('id', 'id')
    tag.setAttribute('data-vqua-key', '1')

    const newNode = convertTag(tag)

    expect(newNode).toEqual({
      dom: tag,
      type: TAG_TYPE,
      tag: 'div',
      key: '1',
      props: {
        id: 'id',
        class: 'class',
        'data-vqua-key': '1',
      },
    })

  })

})


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const convertText = __webpack_require__(2)
const { TEXT_TYPE } = __webpack_require__(0)

describe('Convert text', () => {

  it('return new string', () => {

    const text = document.createTextNode('some text')

    const newNode = convertText(text)

    expect(newNode).toEqual({
      type: TEXT_TYPE,
      text: 'some text',
      dom: text,
    })

  })

})


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const div = __webpack_require__(3)
const { TAG_TYPE, TEXT_TYPE } = __webpack_require__(0)
const dom2vqua = __webpack_require__(10)

describe('Convert dom to vqua', () => {

  it('return new object', () => {

    const newNode = dom2vqua(div)

    expect(newNode).toEqual({
      type: TAG_TYPE,
      tag: 'div',
      props: {},
      dom: div,
      childs: [
        {
          dom: div.childNodes[0],
          type: TEXT_TYPE,
          text: 'text 1',
          childs: [],
        },
        {
          dom: div.childNodes[1],
          type: TAG_TYPE,
          tag: 'span',
          props: {
            id: 'id',
            class: 'class',
          },
          childs: [
            {
              dom: div.childNodes[1].childNodes[0],
              type: TEXT_TYPE,
              text: 'text 2',
              childs: [],
            }
          ]
        },
        {
          dom: div.childNodes[2],
          type: TEXT_TYPE,
          text: 'text 3',
          childs: [],
        }
      ]
    })

  })

})


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const convertTag = __webpack_require__(1)
const convertText = __webpack_require__(2)
const mapNodes = __webpack_require__(4)

module.exports = (nodes) => {

  const TAG_TYPE = 1
  const TEXT_TYPE = 3

  return mapNodes(nodes, (node) => {

    if (node.nodeType == TAG_TYPE) {

      return convertTag(node)

    } else

    if (node.nodeType == TEXT_TYPE) {

      return convertText(node)

    } else {

      return null

    }

  })

}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const div = __webpack_require__(3)
const mapNodes = __webpack_require__(4)

describe('Map dom nodes', () => {

  it('return array', () => {

    const TAG_TYPE = 1

    const TEXT_TYPE = 3

    const newNodes = mapNodes(div.childNodes, (node) => {

      return (node.nodeType == TAG_TYPE) ? { type: 'tag' } : 'text'

    })

    expect(newNodes).toEqual([
      'text',
      {
        type: 'tag',
        childs: [
          'text',
        ],
      },
      'text',
    ])

  })

})


/***/ })
/******/ ]);