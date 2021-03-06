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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  asyncMap:       __webpack_require__(39),
  clone:          __webpack_require__(40),
  flatten:        __webpack_require__(19),
  include:        __webpack_require__(7),
  kindOf:         __webpack_require__(6),
  pick:           __webpack_require__(41),
  omit:           __webpack_require__(42),
  union:          __webpack_require__(43),
  capitalize:     __webpack_require__(44),
  uncapitalize:   __webpack_require__(45),
  classNames:     __webpack_require__(46),
  first:          __webpack_require__(47),
  last:           __webpack_require__(48),
  intersect:      __webpack_require__(49),
  times:          __webpack_require__(50),
  findRightIndex: __webpack_require__(51),
  compose:        __webpack_require__(52),
  htmlQuotes:     __webpack_require__(53),
  nth:            __webpack_require__(54),
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  ROOT_TYPE:     0,
  TEXT_TYPE:     1,
  TAG_TYPE:      2,
  CLASS_TYPE:    3,
  INSTANCE_TYPE: 4,
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { removeRef } = __webpack_require__(21)
const eachNodes = __webpack_require__(9)
const isNodeForUnmount = __webpack_require__(60)

const { INSTANCE_TYPE } = __webpack_require__(1)

const {
  callBeforeMount, callBeforeUnmount, callBeforeUpdate,
  callAfterUpdate, callAfterMount
} = __webpack_require__(61)


const {
  BEFORE_EACH_ITERATION, ON_INSTANCE_CREATE,
  BEFORE_INSTANCE_UPDATE, AFTER_DOM_CREATE
} = __webpack_require__(3)

module.exports = (action, liveNode, templateNode, context) => {

  switch (action) {

    case BEFORE_EACH_ITERATION: {

      if (liveNode && isNodeForUnmount(liveNode, templateNode)) {

        eachNodes(liveNode, (_liveNode) => {

          if (_liveNode.type == INSTANCE_TYPE) {

            callBeforeUnmount(_liveNode.instance)

          }

          if (_liveNode.ref) {

            removeRef(_liveNode)

          }

        })

      }

      break
    }

    case ON_INSTANCE_CREATE: {

      callBeforeMount(liveNode.instance)

      liveNode.instance.waitAfterMount = true

      break
    }

    case BEFORE_INSTANCE_UPDATE: {

      const nextProps = templateNode.props
      const nextState = liveNode.instance.state
      const nextContext = context

      callBeforeUpdate(liveNode.instance, nextProps, nextState, nextContext)

      liveNode.instance.waitAfterUpdate = true

      break
    }

    case AFTER_DOM_CREATE: {

      if (liveNode.instance.waitAfterMount) {

        liveNode.instance.waitAfterMount = false

        callAfterMount(liveNode.instance)

      }

      if (liveNode.instance.waitAfterUpdate) {

        const { prevProps, prevState, prevContext } = liveNode.instance

        callAfterUpdate(liveNode.instance, prevProps, prevState, prevContext)

        liveNode.instance.waitAfterUpdate = false

      }


      break
    }

    default: {

      throw new Error('Unrecognized hook node action')

    }

  }


}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  BEFORE_EACH_ITERATION:  0,
  BEFORE_INSTANCE_UPDATE: 1,
  ON_INSTANCE_CREATE:  2,
  AFTER_DOM_CREATE:       3,
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  INSERT_NODE:  0,
  CREATE_NODE:  1,
  UPDATE_NODE:  2,
  REPLACE_NODE: 3,
  DELETE_NODE:  4,
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Component: __webpack_require__(38),
  html: __webpack_require__(84),
  render: __webpack_require__(86),
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

const checkers = {

  string: (param) => {
    return typeof param == 'string'
  },

  number: (param) => {
    return typeof param == 'number'
  },

  null: (param) => {
    return param === null
  },

  undefined: (param) => {
    return typeof param === 'undefined'
  },

  boolean: (param) => {
    return typeof param == 'boolean'
  },

  object: (param) => {
    return (
      typeof param == 'object' && !Array.isArray(param) && param != null
    )
  },

  array: (param) => {
    return Array.isArray(param)
  },

  function: (param) => {
    return typeof param == 'function'
  },

}

const kindOf = (param) => {
  for (const type in checkers) {
    if (checkers[type](param)) return type
  }
}

module.exports = kindOf


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const include = (array, value) => {
  return array.indexOf(value) > -1
}

module.exports = include


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const {
  TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)

module.exports = (nodes) => {

  return nodes.reduce((counter, node) => {

    if (node && node.type == INSTANCE_TYPE) {

      return counter + node.childDomNodesCount

    } else

    if (node && node.type == TEXT_TYPE || node && node.type == TAG_TYPE) {

      return counter + 1

    } else {

      return counter

    }

  }, 0)

}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

const loop = (node, callback, level = 0, index = 0) => {

  if (Array.isArray(node)) {

    return node.reduce((lastIndex, _node, index) => {

      return loop(_node, callback, level, lastIndex + 1)

    }, index)

  } else {

    callback(node, level, index)

    if (node && node.childs && node.childs.length > 0) {

      return loop(node.childs, callback, level + 1, index)

    } else {

      return index

    }

  }

}

module.exports = loop


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const mapNodes = __webpack_require__(62)

module.exports = (nodes, parentNode) => {

  if (!nodes) return []

  return mapNodes(nodes, (node) => {

    const isNodeRefExist = node && typeof node.ref == 'string'
    const isParentNodeHasInstance = parentNode && parentNode.instance

    if (isNodeRefExist && isParentNodeHasInstance) {

      return Object.assign({}, node, {
        ref: {
          instance: parentNode.instance,
          name: node.ref,
        }
      })

    }

    return node

  })

}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
  CREATE_ROOT:     0,
  CREATE_TEXT:     1,
  CREATE_TAG:      2,
  CREATE_INSTANCE: 3,
  UPDATE_INSTANCE: 4,
  RESUME_INSTANCE: 5,
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

const checkers = {

  string: (param) => {
    return typeof param == 'string'
  },

  number: (param) => {
    return typeof param == 'number'
  },

  null: (param) => {
    return param === null
  },

  undefined: (param) => {
    return typeof param === 'undefined'
  },

  boolean: (param) => {
    return typeof param == 'boolean'
  },

  object: (param) => {
    return (
      typeof param == 'object' && !Array.isArray(param) && param != null
    )
  },

  array: (param) => {
    return Array.isArray(param)
  },

  function: (param) => {
    return typeof param == 'function'
  },

}

const kindOf = (param) => {
  for (const type in checkers) {
    if (checkers[type](param)) return type
  }
}

module.exports = kindOf


/***/ }),
/* 13 */
/***/ (function(module, exports) {

const include = (array, value) => {
  return array.indexOf(value) > -1
}

module.exports = include


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  route: __webpack_require__(108),
  matchRoutes: __webpack_require__(109),
  initRoutes: __webpack_require__(113),
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

const checkers = {

  string: (param) => {
    return typeof param == 'string'
  },

  number: (param) => {
    return typeof param == 'number'
  },

  null: (param) => {
    return param === null
  },

  undefined: (param) => {
    return typeof param === 'undefined'
  },

  boolean: (param) => {
    return typeof param == 'boolean'
  },

  object: (param) => {
    return (
      typeof param == 'object' && !Array.isArray(param) && param != null
    )
  },

  array: (param) => {
    return Array.isArray(param)
  },

  function: (param) => {
    return typeof param == 'function'
  },

}

const kindOf = (param) => {
  for (const type in checkers) {
    if (checkers[type](param)) return type
  }
}

module.exports = kindOf


/***/ }),
/* 16 */
/***/ (function(module, exports) {

const include = (array, value) => {
  return array.indexOf(value) > -1
}

module.exports = include


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const fs = __webpack_require__(35)
const path = __webpack_require__(35)

class Store {

  static async all() {

    return typeof window == "undefined"
      ? await this.allByServer()
      : this.allByBrowser()

  }

  static allByBrowser() {

    const context = __webpack_require__(136)

    const controllers = context.keys().reduce((controllers, filePath) => {

      const controllerName = filePath.slice(2, -3)

      const Controller = context(filePath)

      return Object.assign({}, controllers, {
        [controllerName]: new Controller
      })

    }, {})

    return controllers

  }

  static allByServer() {

    return new Promise((resolve, reject) => {

      const dir = path.resolve(__dirname, '../controllers')

      fs.readdir(dir, (error, files) => {

        if (error) {

          reject(error)

        } else {

          const controllers = files.reduce((controllers, fileName) => {

            if (fileName == '__tests') return controllers

            const filePath = path.resolve(dir, fileName)

            const controllerName = fileName.slice(0, -3)

            const Controller = __webpack_require__(137)(`${filePath}`)

            return Object.assign({}, controllers, {
              [controllerName]: new Controller
            })

          }, {})

          resolve(controllers)

        }

      })

    })


  }

}

module.exports = Store

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const { include, omit } = __webpack_require__(0)
const {
  TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)

const loop = (node, level = 0) => {

  const NEW_LINE = '\n'
  const INDENT = '  '.repeat(level)

  if (Array.isArray(node)) {

    return node.reduce((string, node) => {
      return string + loop(node, level)
    }, '')

  } else

  if (node.type == TEXT_TYPE) {

    return INDENT + node.text + NEW_LINE

  } else

  if (node.type == TAG_TYPE) {

    const childs = node.childs ? loop(node.childs, level + 1) : ''
    const props = omit(node.props, 'childs')

    return (
      INDENT +
      node.tag +
      '(' + JSON.stringify(props) + ')' +
      NEW_LINE +
      childs
    )


  } else

  if (node.type == CLASS_TYPE) {

    const childs = node.childs ? loop(node.childs, level + 1) : ''
    const props = omit(node.props, 'childs')

    return (
      INDENT +
      node.class.name +
      '(' + JSON.stringify(props) + ')' +
      NEW_LINE +
      childs
    )

  } else

  if (node.type == INSTANCE_TYPE) {

    const childs = node.childs ? loop(node.childs, level + 1) : ''
    const props = omit(node.instance.props, 'childs')

    return (
      INDENT +
      node.instance.constructor.name.toLowerCase() +
      '(' + JSON.stringify(props) + ')' +
      ' ' +
      JSON.stringify(node.instance.state) +
      NEW_LINE +
      childs
    )

  }

  return ''

}

module.exports = loop


/***/ }),
/* 19 */
/***/ (function(module, exports) {

const flatten = (items, newItems = []) => {

  for (const item of items) {

    if (Array.isArray(item)) {

      const _items = item

      newItems = flatten(_items, newItems)

    } else {

      newItems.push(item)

    }

  }

  return newItems
}

module.exports = flatten


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const { flatten } = __webpack_require__(0)
const createNodes = __webpack_require__(55)
const createCallback = __webpack_require__(56)
const { sortLiveNodes, sortTemplateNodes } = __webpack_require__(23)
const decorateNodes = __webpack_require__(24)
const createNodesWithRefs = __webpack_require__(10)
const createTextNodes = __webpack_require__(67)
const statistic = __webpack_require__(68)

module.exports = (liveNodes, templateNodes, options) => {

  const filterNodes = (liveNodes, templateNodes, liveParentInstanceNode) => {

    const textTemplateNodes =
      createTextNodes(flatten([templateNodes]))

    const refsTemplateNodes =
      createNodesWithRefs(textTemplateNodes, liveParentInstanceNode)

    const sortedTemplateNodes =
      sortTemplateNodes(refsTemplateNodes)

    const sortedLiveNodes =
      sortLiveNodes(liveNodes, { templateNodes: sortedTemplateNodes })

    return {
      filteredLiveNodes: sortedLiveNodes,
      filteredTemplateNodes: sortedTemplateNodes,
    }

  }

  const nodes =
    createNodes({
      liveNodes,
      templateNodes,
      createNode: createCallback,
      createOptions: {
        hooks: options.hooks,
        linkParent: true,
        childDomNodesCount: true,
        index: true,
      },
      liveParentNode: options.liveParentNode || null,
      liveParentInstanceNode: options.liveParentInstanceNode || null,
      createContext: options.context || {},
      filterNodes,
      statistic
    })

  return nodes

}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const { omit } = __webpack_require__(0)

const addRef = (node, payload) => {

  node.ref.instance.refs =
    Object.assign({}, node.ref.instance.refs, {
      [node.ref.name]: payload
    })

}

const removeRef = (node) => {

  node.ref.instance.refs =
    omit(node.ref.instance.refs, node.ref.name)

}

module.exports = { addRef, removeRef }


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = (error, errorExists, errorNotExists) => {

  if (error) {

    errorExists(error)

  } else {

    errorNotExists()

  }

}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const { flatten, include } = __webpack_require__(0)


const isKeyedNode = node => {
  return Boolean(node && node.key)
}


const getLivePairForTemplate = (liveNode, templateNode, keyedLiveNodes) => {

  if (isKeyedNode(templateNode)) {

    return keyedLiveNodes[templateNode.key] || null

  } else

  if (isKeyedNode(liveNode)) {

    return null

  } else

  if (!templateNode) {

    return null

  } else {

    return liveNode || null

  }
}


const wrapNodesWithTheirKeys = (nodes) => {
  return nodes.reduce((keyedNodes, node) => {
    return (node && node.key)
      ? Object.assign({}, keyedNodes, { [node.key]: node })
      : keyedNodes
  }, {})
}


const sortUsedLiveNodes = ({ liveNodes, templateNodes, keyedLiveNodes }) => {

  if (!templateNodes) return []

  return templateNodes.map((templateNode, index) => {

    return getLivePairForTemplate(
      liveNodes[index],
      templateNode,
      keyedLiveNodes
    )

  })

}


const sortUnusedLiveNodes = ({ liveNodes, usedLiveIds }) => {

  return liveNodes.filter((liveNode, index) => {

    return !include(usedLiveIds, liveNode.id)

  })

}


const sortLiveNodes = (liveNodes = [], { templateNodes = [] }) => {

  const liveSortableNodes = liveNodes.map((node, index) => {

    return { id: index, key: node.key, node }

  })

  const keyedLiveNodes = wrapNodesWithTheirKeys(liveSortableNodes)

  const usedLiveNodes =
    sortUsedLiveNodes({
      liveNodes: liveSortableNodes,
      templateNodes,
      keyedLiveNodes
    })

  const usedLiveIds = usedLiveNodes.reduce((ids, usedLiveNode, index) => {
    return Number.isInteger(usedLiveNode && usedLiveNode.id)
      ? [ ...ids, usedLiveNode.id ]
      : ids
  }, [])

  const unusedLiveNodes =
    sortUnusedLiveNodes({
      liveNodes: liveSortableNodes,
      usedLiveIds
    })

  const sortableLiveNodes = [ ...usedLiveNodes, ...unusedLiveNodes ]

  return sortableLiveNodes.map((sortableNode) => {

    return sortableNode
      ? sortableNode.node
      : sortableNode

  })

}


const sortTemplateNodes = (templateNodes = []) => {

  return flatten([templateNodes]).filter(node => node != null)

}


module.exports = {
  sortLiveNodes,
  sortTemplateNodes,
  wrapNodesWithTheirKeys,
  getLivePairForTemplate,
  isKeyedNode,
  sortUsedLiveNodes,
  sortUnusedLiveNodes,
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = (nodes, { dom = false, order = false }) => {

  if (!nodes) return []

  const info = nodes.reduce((info, node, index) => {

    if (!node) return {
      nodes: [ ...info.nodes, node ],
      order: info.order,
    }

    const nodeDom = dom
      ? { dom: dom[info.order] }
      : {}

    const startFrom = order.startFrom || 0

    const nodeOrder = order
      ? { order: index + startFrom}
      : {}

    const newNode = Object.assign({}, node, nodeDom, nodeOrder)

    return {
      nodes: [ ...info.nodes, newNode ],
      order: info.order + 1,
    }

  }, { nodes: [], order: 0 })

  return info.nodes

}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const { omit, flatten } = __webpack_require__(0)
const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)


const loop = (node, instance = null) => {

  if (Array.isArray(node)) {

    const newNodes = node.reduce((newNodes, _node) => {
      const newNode = loop(_node, instance)
      return (newNode) ? [ ...newNodes,  newNode] : newNodes
    }, [])

    return flatten(newNodes)

  } else

  if (node.type == TAG_TYPE) {

    return Object.assign({},
      omit(node, 'childs'),
      { instance },
      { childs: loop(node.childs, instance) }
    )

  } else

  if (node.type == TEXT_TYPE) {

    return Object.assign({}, { instance }, node)

  } else

  if (node.type == INSTANCE_TYPE) {

    return loop(node.childs, node.instance)

  } else

  if (node.type == ROOT_TYPE) {

    return loop(node.childs, instance)

  } else {

    return null

  }

}

module.exports = loop


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const { sortLiveNodes } = __webpack_require__(23)
const reorderDeletedLiveNodes = __webpack_require__(72)
const reorderAddedLiveNodes = __webpack_require__(73)
const decorateNodes = __webpack_require__(24)
const createNodes = __webpack_require__(74)
const createCallback = __webpack_require__(75)

module.exports = ({ offset, liveNodes, templateNodes, domNodes }) => {

  const patchNodes = (
    createNodes({
      offset,
      limit: templateNodes.length,
      liveNodes,
      templateNodes,
      createNode: createCallback,
      domNodes,
      filterNodes: (liveNodes, templateNodes, { domNodes, offset } = {}) => {

        const orderedTemplateNodes =
          decorateNodes(templateNodes, {
            order: { startFrom: offset }
          })

        const withDomLiveNodes =
          decorateNodes(liveNodes, {
            dom: domNodes,
            order: { startFrom: offset },
          })

        const sortedLiveNodes =
          sortLiveNodes(withDomLiveNodes, {
            templateNodes: orderedTemplateNodes
          })

        const reorderedDeletedLiveNodes =
          reorderDeletedLiveNodes(sortedLiveNodes, {
            templateNodes: orderedTemplateNodes,
            offset,
          })

        const reorderedAddedLiveNodes =
          reorderAddedLiveNodes(reorderedDeletedLiveNodes, {
            templateNodes: orderedTemplateNodes
          })

        return {
          filteredLiveNodes: reorderedAddedLiveNodes,
          filteredTemplateNodes: orderedTemplateNodes
        }

      }
    })
  )

  return patchNodes

}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

const updateDomNode = __webpack_require__(79)
const updateNodes = __webpack_require__(83)

module.exports = ({ parentDomNode, patchNodes }) => {

  updateNodes({ patchNodes, parentDomNode, updateDomNode })

}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

const events = __webpack_require__(29)

module.exports = (props) => {

  return Object.keys(props).reduce((sortedProps, key) => {

    if (events.hasOwnProperty(key)) {

      const eventProps =
        Object.assign(
          {},
          sortedProps.eventProps,
          { [key]: props[key] }
        )

      return {
        eventProps,
        elementProps: sortedProps.elementProps,
      }

    } else {

      const elementProps =
        Object.assign(
          {},
          sortedProps.elementProps,
          { [key]: props[key] }
        )

      return {
        eventProps: sortedProps.eventProps,
        elementProps,
      }

    }

  }, { eventProps: {}, elementProps: {} })

}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// https://www.w3schools.com/jsref/dom_obj_event.asp

module.exports = {

  // Mouse Events
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onDblClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onMouseUp: 'mouseup',

  // Keyboard Events
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',

  // Frame/Object Events
  onAbort: 'abort',
  onBeforeUnload: 'beforeunload',
  onError: 'error',
  onHashChange: 'hashchange',
  onLoad: 'load',
  onPagesShow: 'pageshow',
  onPageHide: 'pagehide',
  onResize: 'resize',
  onScroll: 'scroll',
  onUnload: 'unload',

  // Form Events
  onBlur: 'blur',
  onChange: 'change',
  onFocus: 'focus',
  onFocusIn: 'focusin',
  onFocusOut: 'focusout',
  onInput: 'input',
  onInvalid: 'invalid',
  onReset: 'reset',
  onSearch: 'search',
  onSelect: 'select',
  onSubmit: 'submit',

  // Drag Events
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',

  // Clipboard Events
  onCopy: 'copy',
  onCut: 'cut',
  onPaste: 'paste',

  // Print Events
  onAfterPrint: 'afterprint',
  onBeforePrint: 'beforeprint',

  // Media Events
  onAbort: 'abort',
  onCanPlay: 'canplay',
  onCanPlayThrough: 'canplaythrough	',
  onDurationChange: 'durationchange',
  onEmptied: 'emptied',
  onEnded: 'ended',
  onError: 'error',
  onLoadedData: 'loadeddata',
  onLoadedMetadata: 'loadedmetadata',
  onLoadStart: 'loadstart',
  onPause: 'pause',
  onPlay: 'play',
  onPlaying: 'playing',
  onProgress: 'progress',
  onRateChange: 'ratechange',
  onSeeked: 'seeked',
  onSeeking: 'seeking',
  onStalled: 'stalled',
  onSuspend: 'suspend',
  onTimeUpdate: 'timeupdate',
  onVolumeChange: 'volumechange',
  onWaiting: 'waiting',

  // Animation Events
  animationEnd: 'animationend',
  animationIteration: 'animationiteration',
  animationStart: 'animationstart',

  // Transition Events
  transitionEnd: 'transitionend',

  // Server-Sent Events
  onError: 'error',
  onMessage: 'message',
  onOpen: 'open',

  // Misc Events
  onMessage: 'message',
  onOnline: 'online',
  onOffline: 'offline',
  onPopState: 'popstate',
  onShow: 'show',
  onStorage: 'storage',
  onToggle: 'toggle',
  onWheel: 'wheel',

  // Touch Events
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',

}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  asyncMap:       __webpack_require__(92),
  clone:          __webpack_require__(93),
  flatten:        __webpack_require__(31),
  include:        __webpack_require__(13),
  kindOf:         __webpack_require__(12),
  pick:           __webpack_require__(94),
  omit:           __webpack_require__(95),
  union:          __webpack_require__(96),
  capitalize:     __webpack_require__(97),
  uncapitalize:   __webpack_require__(98),
  classNames:     __webpack_require__(99),
  first:          __webpack_require__(100),
  last:           __webpack_require__(101),
  intersect:      __webpack_require__(102),
  times:          __webpack_require__(103),
  findRightIndex: __webpack_require__(104),
  compose:        __webpack_require__(105),
  htmlQuotes:     __webpack_require__(106),
  nth:            __webpack_require__(107),
}


/***/ }),
/* 31 */
/***/ (function(module, exports) {

const flatten = (items, newItems = []) => {

  for (const item of items) {

    if (Array.isArray(item)) {

      const _items = item

      newItems = flatten(_items, newItems)

    } else {

      newItems.push(item)

    }

  }

  return newItems
}

module.exports = flatten


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = (path) => {

  const boundarySlashes = /^\/+|\/+$/g

  return path.replace(boundarySlashes, '').split('/')

}


/***/ }),
/* 33 */
/***/ (function(module, exports) {

const flatten = (items, newItems = []) => {

  for (const item of items) {

    if (Array.isArray(item)) {

      const _items = item

      newItems = flatten(_items, newItems)

    } else {

      newItems.push(item)

    }

  }

  return newItems
}

module.exports = flatten


/***/ }),
/* 34 */
/***/ (function(module, exports) {

class WelcomeController {

  index(request, response) {

    response.send(200, 'WelcomeContainer', { props: {}, context: {} })

  }

}

module.exports = WelcomeController


/***/ }),
/* 35 */
/***/ (function(module, exports) {



/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

const { Component, html } = __webpack_require__(5)

class WelcomeContainer extends Component {

  render() {

    const { h1, p } = html

    return [
      h1({},
        'Welcome!'
      ),
      p({},
        'Test page.'
      )
    ]

  }

}

module.exports = WelcomeContainer


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

const { render } = __webpack_require__(5)
const Navigation = __webpack_require__(91)
const initRoutes = __webpack_require__(134)

initRoutes().then(routes => {

  let liveNodes = []

  const navigation = new Navigation(routes)

  navigation.onNavigate(({ path, statusCode, componentName, params }) => {

    const $app = document.getElementById('app')

    const Component = __webpack_require__(138)("./" + componentName)

    const context = Object.assign(params.context, {
      navigate: navigation.navigate.bind(navigation)
    })

    const templateNodes = [ Component.v(params.props, context) ]

    liveNodes = render($app, liveNodes, templateNodes, context)

  })


  navigation.onRedirect(({ redirectPath, statusCode, params }) => {

    window.history.pushState({}, '', redirectPath)

    navigation.navigate(redirectPath)

  })


  const $cache = document.getElementById('app-cache')

  const cache = $cache.innerHTML

  $cache.parentNode.removeChild($cache)


  navigation.navigate(window.location.pathname, cache)


  window.onpopstate = (event) => {

    navigation.navigate(window.location.pathname)

  }


})


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

const humanizeNodes = __webpack_require__(18)
const { flatten, omit, clone, pick } = __webpack_require__(0)
const countDomNodes = __webpack_require__(8)
const createLiveTree = __webpack_require__(20)
const filterDomNodes = __webpack_require__(25)
const getParentNodes = __webpack_require__(70)
const filterNodesOffsets = __webpack_require__(71)
const createPatchTree = __webpack_require__(26)
const findDomNode = __webpack_require__(78)
const updateDomTree = __webpack_require__(27)
const eachNodes = __webpack_require__(9)
const { INSTANCE_TYPE, CLASS_TYPE } = __webpack_require__(1)
const hookNode = __webpack_require__(2)
const { AFTER_DOM_CREATE } = __webpack_require__(3)

class Base {

  static defaultProps() {

    return {}

  }

  static v(props = {}, ...childs) {

    const newProps = Object.assign({}, omit(props, 'ref', 'key'), { childs })

    const refParams =
      props.ref
        ? { ref: props.ref }
        : {}


    const keyParams = props.key
      ? { key: props.key }
      : {}

    const baseParams = {
      type: CLASS_TYPE,
      class: this,
      props: newProps
    }

    return Object.assign({}, baseParams, refParams, keyParams)

  }

  constructor(props, context) {

    this.props = props
    this.state = {}
    this.context = context
    this.nextProps = {}
    this.nextState = {}
    this.nextContext = {}
    this.prevProps = {}
    this.prevState = {}
    this.prevContext = {}
    this.parentRef = null
    this.parentInstance = null
    this.refs = {}

  }


  isNeedUpdate(nextProps, nextState, nextContext) {

    return true

  }

  passContext() {

    return {}

  }

  setState(newState, callback = false) {

    const newMergedState = Object.assign({}, this.state, newState)

    const newContext = clone(this.node.context)

    const injectedContext = this.constructor.injectContext
      ? pick(newContext, ...this.constructor.injectContext())
      : {}

    if (
      !this.isNeedUpdate(this.props, newMergedState, injectedContext)
    ) return false

    if ('beforeUpdate' in this) {

      this.beforeUpdate(this.props, newMergedState, injectedContext)

    }

    this.waitAfterUpdate = true

    this.state = newMergedState

    const liveNodes = this.node.childs

    const templateNodes = flatten([ this.render() ])

    const newLiveNodes =
      createLiveTree(liveNodes, templateNodes, {
        hooks: true,
        linkParent: true,
        childDomNodesCount: true,
        index: true,
        context: Object.assign({}, newContext, this.passContext()),
        liveParentNode: this.node,
        liveParentInstanceNode: this.node,
      })

    this.node.childs = newLiveNodes

    this.node.childDomNodesCount = countDomNodes(newLiveNodes)

    const filteredLiveNodes = filterDomNodes(liveNodes, this)

    const filteredTemplateNodes = filterDomNodes(newLiveNodes, this)

    const parentNodes = getParentNodes(filteredLiveNodes[0])

    const parentOffsets = filterNodesOffsets(parentNodes)

    const offset = parentOffsets[parentOffsets.length - 1]

    const boundaryDomNode = findDomNode(parentNodes[0].dom, parentOffsets)

    const domRootNode = boundaryDomNode.parentNode

    const domRootChildNodes =
      Array.from(domRootNode.childNodes)
        .slice(offset, offset + filteredLiveNodes.length)

    const patchNodes =
      createPatchTree({
        offset,
        domNodes: domRootChildNodes,
        liveNodes: filteredLiveNodes,
        templateNodes: filteredTemplateNodes,
      })

    updateDomTree({ patchNodes, parentDomNode: domRootNode })

    eachNodes([this.node], (liveNode) => {

      if (liveNode.type == INSTANCE_TYPE) {

        hookNode(AFTER_DOM_CREATE, liveNode, null, null)

      }

    })


  }

}

module.exports = Base


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = (items, mapper, callback) => {

  if (items.length == 0) return callback(null, [])

  let counter = 0

  let results = []

  items.forEach((item, index) => {

    new Promise((resolve, reject) => {

      mapper(item, index, (error, result) => {

        if (error) {

          reject(error)

        } else {

          resolve(result)

        }

      })

    }).then((result) => {

      results[index] = result

      if (items.length == ++counter)
        callback(null, results)

    }).catch((error) => {

      callback(error, null)

    })

  })

}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

const kindOf = __webpack_require__(6)
const include = __webpack_require__(7)

const clone = (argument) => {

  const argumentType = kindOf(argument)


  if (argumentType == 'object') {

    const object = argument

    const newObject = {}

    for (const key in object) {

      const value = object[key]

      const valueType = kindOf(value)

      if (include(['array','object'], valueType)) {

        newObject[key] = clone(value)

      } else {

        newObject[key] = value

      }

    }

    return newObject

  } else


  if (argumentType == 'array') {

    const array = argument

    const newArray = []

    for (const value of array) {

      const valueType = kindOf(value)

      if (include(['array','object'], valueType)) {

        newArray.push(clone(value))

      } else {

        newArray.push(value)

      }

    }

    return newArray


  } else {

    throw new Error('Cloned argument should be type of Array or Object.')

  }

}

module.exports = clone


/***/ }),
/* 41 */
/***/ (function(module, exports) {

const pick = (object, ...keys) => {
  const newObject = {}
  keys.forEach((key) => {
    if (key in object)
      newObject[key] = object[key]
  })
  return newObject
}

module.exports = pick


/***/ }),
/* 42 */
/***/ (function(module, exports) {

const omit = (object, ...keys) => {
  const newObject = {}
  Object.keys(object).forEach((key) => {
    if (keys.indexOf(key) == -1)
      newObject[key] = object[key]
  })
  return newObject

}

module.exports = omit


/***/ }),
/* 43 */
/***/ (function(module, exports) {

const union = (first, second) => {
  return first.concat(
    second.filter((key) => first.indexOf(key) == -1)
  )
}

module.exports = union


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = (string) => {

  return string.charAt(0).toLowerCase() + string.slice(1)

}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

const flatten = __webpack_require__(19)
const kindOf = __webpack_require__(6)
const include = __webpack_require__(7)

module.exports = (...args) => {

  const unpackObjects = (args) => {

    return args.map((arg) => {

      const argType = kindOf(arg)

      if (argType == 'array') {

        return unpackObjects(arg)

      } else

      if (argType == 'object') {

        return Object.keys(arg).map((key) => {

          return arg[key] ? key : false

        })

      } else {

        return arg

      }

    })

  }

  return (
    flatten( unpackObjects(args) )
      .filter((arg) => {
        return include(['number', 'string'], typeof arg)
      })
      .join(' ')
  )

}


// const flattenNames = flatten(args)
//
// const objectNames = flattenNames.map((arg) => {
//
//   if(kindOf(arg) == 'object') {
//
//     Object.keys(arg).map((key) => {
//
//       if (arg[key]) {
//
//         return key
//
//       }
//
//       return false
//
//     })
//
//   }
//
//   return arg
//
// })
//
// const cleanedClassNames =
//
// return classNames..join(' ')


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = (array) => {

  return array[0]

}


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = (array) => {

  return array[array.length - 1]

}


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = (left, right) => {

  if (!Array.isArray(left) || !Array.isArray(right)) return null

  return left.reduce((values, value) => {

    return right.indexOf(value) > -1
      ? [ ...values, value ]
      : values

  }, [])

}


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = (count) => {

  return [...Array(count).keys()]

}


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = (items, match) => {

  const loop = (items, index) => {

    if (index == -1) return -1

    return match(items[index])
      ? index
      : loop(items, index - 1)
  }

  return loop(items, items.length - 1)

}


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = (...methods) => {

  return (result) => {

    return methods.reduceRight((result, method) => {

      return method(result)

    }, result)

  }

}


/***/ }),
/* 53 */
/***/ (function(module, exports) {

const OPEN_QUOTE_SPECIAL = '&lt;'
const CLOSE_QUOTE_SPECIAL = '&gt;'

const OPEN_QUOTE_SIMPLE = '<'
const CLOSE_QUOTE_SIMPLE = '>'

const SPECIAL_TO_SIMPLE = {
  [OPEN_QUOTE_SPECIAL]:  OPEN_QUOTE_SIMPLE,
  [CLOSE_QUOTE_SPECIAL]: CLOSE_QUOTE_SIMPLE
}

const SIMPLE_TO_SPECIAL = {
  [OPEN_QUOTE_SIMPLE]:  OPEN_QUOTE_SPECIAL,
  [CLOSE_QUOTE_SIMPLE]: CLOSE_QUOTE_SPECIAL
}

const SIMPLE_QUOTES =
  new RegExp(OPEN_QUOTE_SIMPLE + '|' + CLOSE_QUOTE_SIMPLE, 'g')

const SPECIAL_QUOTES =
  new RegExp(OPEN_QUOTE_SPECIAL + '|' + CLOSE_QUOTE_SPECIAL, 'g')

const encode = (string) => (
  string.replace(SIMPLE_QUOTES, match => SIMPLE_TO_SPECIAL[match])
)

const decode = (string) => (
  string.replace(SPECIAL_QUOTES, match => SPECIAL_TO_SIMPLE[match])
)

module.exports = { encode, decode }


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = (items, index) => {

  if (index >= 0) {

    return items[index]

  } else {

    return items[items.length + index]

  }

}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

const countDomNodes = __webpack_require__(8)

const createNodes = ({
  liveNodes = [],
  templateNodes = [],
  createNode,
  createOptions = {},
  createContext = {},
  liveParentNode = null,
  liveParentInstanceNode = null,
  statistic = null,
  filterNodes = (liveNodes, templateNodes, liveParentInstanceNode) => {
    return {
      filteredLiveNodes: liveNodes,
      filteredTemplateNodes: templateNodes
    }
  }
}) => {

  if (liveNodes.length + templateNodes.length == 0) return []

  const {
    filteredLiveNodes,
    filteredTemplateNodes
  } = filterNodes(liveNodes, templateNodes, liveParentInstanceNode)

  return filteredLiveNodes.reduce((newLiveNodes, liveNode, index) => {

    const templateNode = filteredTemplateNodes[index] || null

    const {
      newLiveNode,
      isNeedChilds,
      liveChilds,
      templateChilds,
      newContext,
      newLiveParentInstanceNode,
    } = createNode({
      index,
      liveNode,
      templateNode,
      options: createOptions,
      context: createContext,
      liveParentInstanceNode,
      statistic
    })

    if (!newLiveNode) return newLiveNodes

    const nodeIndex =
      createOptions.index
        ? { index }
        : {}

    const parentNode =
      createOptions.linkParent
        ? { parent: liveParentNode }
        : {}

    const newLiveNodeWithInfo =
      Object.assign(
        newLiveNode,
        nodeIndex,
        parentNode,
      )

    if (!isNeedChilds) return [ ...newLiveNodes, newLiveNodeWithInfo ]

    const childs =
      createNodes({
        liveParentNode: newLiveNodeWithInfo,
        liveParentInstanceNode: newLiveParentInstanceNode,
        liveNodes: liveChilds || [],
        templateNodes: templateChilds || [],
        createNode,
        createOptions,
        createContext: newContext,
        filterNodes,
        index,
        statistic
      })

    const childDomNodesCount  =
      createOptions.childDomNodesCount
        ? { childDomNodesCount: countDomNodes(childs) }
        : {}

    const childNodes = { childs }

    const liveNodeWithChilds =
      Object.assign(
        newLiveNodeWithInfo,
        childNodes,
        childDomNodesCount,
      )

    return [ ...newLiveNodes, liveNodeWithChilds ]

  }, [])

}

module.exports = createNodes


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

const { pick } = __webpack_require__(0)
const createNode = __webpack_require__(57)
const hookNode = __webpack_require__(2)
const getCreateAction = __webpack_require__(66)
const handleError = __webpack_require__(22)

const {
  BEFORE_EACH_ITERATION, BEFORE_INSTANCE_UPDATE, ON_INSTANCE_CREATE
} = __webpack_require__(3)

const {
  CREATE_ROOT, CREATE_TEXT, CREATE_TAG,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = __webpack_require__(11)

module.exports = ({
  index,
  liveNode,
  templateNode,
  liveParentInstanceNode,
  options = {
    hooks: false,
  },
  context = {},
  statistic = null,
}) => {

  const injectedContext =
    templateNode && templateNode.class && templateNode.class.injectContext
      ? pick(context, ... templateNode.class.injectContext())
      : {}

  if (options.hooks) {
    hookNode(
      BEFORE_EACH_ITERATION,
      liveNode,
      templateNode,
      injectedContext
    )
  }

  const createAction = getCreateAction(liveNode, templateNode, injectedContext)

  switch (createAction) {

    case CREATE_ROOT: {

      const newLiveNode =
        createNode({
          type: CREATE_ROOT,
          liveNode,
          templateNode,
          statistic,
        })

      return {
        newLiveNode,
        isNeedChilds: true,
        newContext: context,
        templateChilds: newLiveNode ? newLiveNode.childs : [],
        liveChilds: liveNode ? liveNode.childs : [],
        newLiveParentInstanceNode: liveParentInstanceNode,
      }

    }

    case CREATE_INSTANCE: {

      const newLiveNode =
        createNode({
          type: CREATE_INSTANCE,
          liveNode,
          templateNode,
          context,
          injectedContext,
          statistic,
          beforeRender: (instance) => {

            if (options.hooks) {
              hookNode(
                ON_INSTANCE_CREATE,
                { instance }
              )
            }

          }
        })

      const newContext =
        Object.assign(
          {},
          context,
          newLiveNode.instance.passContext()
        )

      return {
        newLiveNode,
        isNeedChilds: true,
        newContext,
        liveChilds: liveNode ? liveNode.childs : [],
        templateChilds: newLiveNode ? newLiveNode.childs : [],
        newLiveParentInstanceNode: newLiveNode,
      }

    }

    case UPDATE_INSTANCE: {

      if (options.hooks) {
        hookNode(
          BEFORE_INSTANCE_UPDATE,
          liveNode,
          templateNode,
          injectedContext
        )
      }

      const newLiveNode =
        createNode({
          type: UPDATE_INSTANCE,
          liveNode,
          templateNode,
          injectedContext,
          context,
          statistic,
        })

      const newContext =
        Object.assign(
          {},
          context,
          newLiveNode.instance.passContext()
        )

      return {
        newLiveNode,
        isNeedChilds: true,
        newContext,
        liveChilds: liveNode && liveNode.childs || [],
        templateChilds: newLiveNode.childs,
        newLiveParentInstanceNode: newLiveNode,
      }

    }

    case RESUME_INSTANCE: {

      const newLiveNode =
        createNode({
          type: RESUME_INSTANCE,
          liveNode,
          templateNode,
          statistic,
        })

      return {
        newLiveNode,
        isNeedChilds: false,
        newContext: context,
        newLiveParentInstanceNode: newLiveNode,
      }

    }

    case CREATE_TAG: {

      const newLiveNode =
        createNode({
          type: CREATE_TAG,
          liveNode,
          templateNode,
          statistic,
        })

      return {
        newLiveNode,
        newContext: context,
        isNeedChilds: true,
        liveChilds: liveNode ? liveNode.childs : [],
        templateChilds: templateNode ? templateNode.childs : [],
        newLiveParentInstanceNode: liveParentInstanceNode,
      }

    }

    case CREATE_TEXT: {

      const newLiveNode =
        createNode({
          type: CREATE_TEXT,
          liveNode,
          templateNode,
          statistic
        })

      return {
        newLiveNode,
        isNeedChilds: false,
        newContext: context,
        newLiveParentInstanceNode: liveParentInstanceNode,
      }

      break
    }

    default: {

      return {
        newLiveNode: null,
        isNeedChilds: false,
        newContext: context,
        newLiveParentInstanceNode: null,
      }

    }

  }


}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

const createRootNode = __webpack_require__(58)
const createInstanceNode = __webpack_require__(59)
const updateInstanceNode = __webpack_require__(63)
const createTagNode = __webpack_require__(64)
const createTextNode = __webpack_require__(65)
const handleError = __webpack_require__(22)

const {
  CREATE_ROOT, CREATE_TEXT, CREATE_TAG,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = __webpack_require__(11)

module.exports = ({
  type = null,
  liveNode = null,
  templateNode = null,
  context = null,
  injectedContext = null,
  beforeRender = null,
  statistic = null,
}, callback) => {

  switch (type) {

    case CREATE_ROOT: {

      const newRootNode = createRootNode({ templateNode, statistic })

      return newRootNode

    }

    case CREATE_INSTANCE: {

      const newLiveNode =
        createInstanceNode({
          templateNode,
          context,
          injectedContext,
          beforeRender,
          statistic,
        })

      if (templateNode.ref) {

        templateNode.ref.instance.refs =
          Object.assign({}, templateNode.ref.instance.refs, {
            [templateNode.ref.name]: newLiveNode.instance
          })

      }

      return newLiveNode

    }

    case UPDATE_INSTANCE: {

      const newLiveNode =
        updateInstanceNode({
          liveNode,
          templateNode,
          context,
          injectedContext,
          statistic
        })

      return newLiveNode

    }

    case RESUME_INSTANCE: {

      return liveNode

    }

    case CREATE_TAG: {

      const newTagNode = createTagNode({ templateNode, statistic })

      return newTagNode

    }

    case CREATE_TEXT: {

      const newTextNode = createTextNode({ templateNode, statistic })

      return newTextNode

    }

    default: {

      throw new Error('Unrecognized create node type')

    }

  }


}


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = ({ templateNode, statistic }) => {

  const statisticParams = statistic
    ? { statistic }
    : {}

  const newRootNode = {
    type: templateNode.type,
    dom: templateNode.dom,
    childs: templateNode.childs,
  }

  return Object.assign({}, newRootNode, statisticParams)

}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

const { flatten, pick } = __webpack_require__(0)
const hookNode = __webpack_require__(2)
const { INSTANCE_TYPE } = __webpack_require__(1)
const createNodesWithRefs = __webpack_require__(10)

module.exports = ({
  templateNode,
  context,
  injectedContext = {},
  afterRender,
  beforeRender,
  statistic
} = {}) => {

  const defaultProps = templateNode.class.defaultProps()

  const mergedProps = Object.assign({}, defaultProps, templateNode.props)

  const instance = new templateNode.class(mergedProps, injectedContext)

  if (beforeRender) beforeRender(instance)

  const childs = 'render' in instance && flatten([instance.render()]) || []

  const refParams = templateNode.ref
    ? { ref: templateNode.ref }
    : {}

  const keyParams = templateNode.key
    ? { key: templateNode.key }
    : {}

  const statisticParams = statistic
    ? {
        instanceId: statistic.increaseLastInstanceId(),
        statistic,
      }
    : {}

  const newInstanceNode =
    Object.assign({}, {
      context,
      instance,
      type: INSTANCE_TYPE,
      ref: templateNode.ref,
      childs,
    },
      refParams,
      keyParams,
      statisticParams
    )

  instance.node = newInstanceNode

  return newInstanceNode

}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)

module.exports = (liveNode, templateNode) => {

  switch (liveNode.type) {

    case ROOT_TYPE: {

      return false

    }

    case INSTANCE_TYPE: {

      if (
        templateNode && templateNode.type == CLASS_TYPE &&
        liveNode.instance instanceof templateNode.class
      ) {

        return false

      } else {

        return true

      }

      break
    }

    case TAG_TYPE: {

      if (
        templateNode &&
        templateNode.type == TAG_TYPE &&
        templateNode.tag == liveNode.tag
      ) {

        return false

      } else {

        return true

      }

      break
    }

    case TEXT_TYPE: {

      if (
        templateNode && 
        templateNode.type == TEXT_TYPE &&
        templateNode.text == liveNode.text
      ) {

        return false

      } else {

        return true

      }

      break
    }

    default: {

      return false

    }


  }

}


/***/ }),
/* 61 */
/***/ (function(module, exports) {

// Before render dom

const callBeforeMount = (instance) => {

  if ('beforeMount' in instance) {

    instance.beforeMount()

  }


}

const callBeforeUpdate = (instance, nextProps, nextState, nextContext) => {

  if ('beforeUpdate' in instance) {

    instance.beforeUpdate(nextProps, nextState, nextContext)

  }

}

const callBeforeUnmount = (instance) => {

  if ('beforeUnmount' in instance) {

    instance.beforeUnmount()

  }

}

// After render dom

const callAfterMount = (instance) => {

  if ('afterMount' in instance) {

    instance.afterMount()

  }

}

const callAfterUpdate = (instance, prevProps, prevState, prevContext) => {

  if ('afterUpdate' in instance) {

    instance.afterUpdate(prevProps, prevState, prevContext)

  }

}

module.exports = {
  callBeforeMount,
  callBeforeUnmount,
  callBeforeUpdate,
  callAfterMount,
  callAfterUpdate
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

const { kindOf } = __webpack_require__(0)

const loop = (node, callback) => {

  const nodeType = kindOf(node)

  if (nodeType == 'array') {

    return node.map((_node) => {

      return loop(_node, callback)

    })

  } else

  if (nodeType == 'object') {

    const childs =
      node && node.childs && node.childs.length > 0
        ? loop(node.childs, callback)
        : []

    const newChilds = node.childs ? { childs } : {}

    return Object.assign({}, callback(node), newChilds)

  } else {

    return node

  }

}

module.exports = loop


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

const { flatten, pick } = __webpack_require__(0)
const createNodesWithRefs = __webpack_require__(10)

module.exports = ({
  liveNode,
  templateNode,
  context,
  injectedContext,
  statistic
}) => {

  const liveType = liveNode.type
  const liveInstance = liveNode.instance

  liveInstance.prevProps = liveInstance.props
  liveInstance.prevState = liveInstance.state
  liveInstance.prevContext = liveInstance.context

  liveInstance.props = templateNode.props
  liveInstance.state = liveInstance.state

  liveInstance.context = injectedContext

  const childs = flatten([liveInstance.render() || null])

  const statisticParams = statistic
    ? {
        statistic,
        instanceId: statistic.getLastInstanceId(),
      }
    : {}

  const newInstanceNode =
    Object.assign({}, {
      context,
      type: liveType,
      instance: liveInstance,
      childs,
    }, statisticParams)

  liveInstance.node = newInstanceNode

  return newInstanceNode

}


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = ({ templateNode, statistic }) => {

  const refParams =
    templateNode.ref
      ? { ref: templateNode.ref }
      : {}

  const statisticParams = statistic
    ? { statistic }
    : {}

  const keyParams =
    templateNode.key
      ? { key: templateNode.key }
      : {}

  const newTagNode = {
    type: templateNode.type,
    tag: templateNode.tag,
    props: templateNode.props,
    childs: templateNode.childs,
  }

  const propsParams =
    templateNode.key
      ? {
          props: Object.assign({}, templateNode.props, {
            'data-vqua-key': templateNode.key
          })
        }
      : {}


  return Object.assign({},
    newTagNode,
    refParams,
    statisticParams,
    keyParams,
    propsParams,
  )

}


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = ({ templateNode, statistic }) => {

  const statisticParams = statistic
    ? { statistic }
    : {}

  const newTagNode = {
    type: templateNode.type,
    text: templateNode.text,
  }

  return Object.assign({}, newTagNode, statisticParams)

}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)

const {
  CREATE_ROOT, CREATE_TAG, CREATE_TEXT,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = __webpack_require__(11)

module.exports = (liveNode, templateNode, context) => {

  if (templateNode) {

    if (templateNode.type == ROOT_TYPE) {

      return CREATE_ROOT

    } else

    if (templateNode.type == TEXT_TYPE) {

      return CREATE_TEXT

    } else

    if (templateNode.type == TAG_TYPE) {

      return CREATE_TAG

    } else

    if (templateNode.type == CLASS_TYPE) {

      if (
        liveNode &&
        typeof liveNode == 'object' &&
        liveNode.type == INSTANCE_TYPE &&
        liveNode.instance instanceof templateNode.class
      ) {

        const props = templateNode.props
        const state = liveNode.instance.state

        if (liveNode.instance.isNeedUpdate(props, state, context)) {

          return UPDATE_INSTANCE

        } else {

          return RESUME_INSTANCE

        }

      } else {

        return CREATE_INSTANCE

      }

    }


  } else {

    return null

  }

}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

const { flatten } = __webpack_require__(0)
const { TEXT_TYPE } = __webpack_require__(1)

module.exports = (childs) => {

  return childs.map((node) => {

    if (typeof node == 'undefined') {

      return null

    } else

    if (typeof node != 'object' && node != null) {

      return {
        type: TEXT_TYPE,
        text: typeof node == 'number' ? node : node || '',
        childs: []
      }

    }

    return node

  })

}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

const Statistic = __webpack_require__(69)

module.exports = new Statistic


/***/ }),
/* 69 */
/***/ (function(module, exports) {

class Statistic {

  constructor() {

    this.lastInstanceId = 0

  }

  getLastInstanceId() {
    return this.lastInstanceId
  }

  increaseLastInstanceId() {
    return this.lastInstanceId = this.lastInstanceId + 1
  }

}

module.exports = Statistic


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

const countDomNodes = __webpack_require__(8)
const { INSTANCE_TYPE } = __webpack_require__(1)

const loop = (node, nodes = [], offset = 0) => {

  if (node.parent) {

    if (node.parent.type == INSTANCE_TYPE) {

      const newOffset =
        countDomNodes(
          node.parent.childs.slice(0, node.index)
        ) + offset

      return (
        loop(
          node.parent,
          nodes,
          newOffset
        )
      )

    } else {

      const newOffset =
        countDomNodes(
          node.parent.childs.slice(0, node.index)
        ) + offset

      return (
        loop(
          node.parent,
          [
            Object.assign({}, node, { offset: newOffset }),
            ...nodes
          ],
          0
        )
      )

    }

  } else {

    return [ node, ...nodes ]

  }

}

module.exports = loop


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = (nodes) => {
  return nodes.reduce((offsets, node) => {
    return node.hasOwnProperty('offset')
      ? [ ...offsets, node.offset ]
      : offsets
  }, [])
}


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = (liveNodes, { templateNodes, offset = 0 }) => {

  const savedLiveNodes = liveNodes.slice(0, templateNodes.length)

  const savedLiveStands = savedLiveNodes.map((uncutLiveNode, index) => {

    return { index, node: uncutLiveNode }

  })

  const sortedLiveStands = savedLiveStands.sort((prev, next) => {

    if (prev.node == null) {

      return 1

    } else

    if (next.node == null) {

      return -1

    } else {

      return prev.node.order - next.node.order

    }

  })

  const newLiveStands =
    sortedLiveStands.map((liveStand, index) => {

      if (!liveStand.node) return liveStand

      const newLiveStand = Object.assign({}, liveStand, {
        node: Object.assign({}, liveStand.node, {
          order: offset + index
        })
      })

      return newLiveStand

    })

  const newSavedLiveNodes = newLiveStands
    .sort((prev, next) => prev.index - next.index)
    .map(newLiveStand => newLiveStand.node)

  const newUnsavedLiveNodes = liveNodes
    .slice(templateNodes.length)
    .map(unsavedLiveNode => Object.assign({}, unsavedLiveNode, { order: null }))

  const newLiveNodes = [ ...newSavedLiveNodes, ...newUnsavedLiveNodes ]

  return newLiveNodes

}


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = (liveNodes, { templateNodes }) => {

  const memo = templateNodes.reduce((memo, templateNode, index) => {

    const liveNode = liveNodes[index]

    const newLiveNode = !liveNode || !memo.multipliers.length
      ? liveNode
      : memo.multipliers.reduce((newLiveNode, multiplier) => {

          if (
            newLiveNode.order > multiplier.min &&
            newLiveNode.order < multiplier.max
          ) {

            return Object.assign({},
              newLiveNode,
              { order: newLiveNode.order + multiplier.rate }
            )

          } else {

            return newLiveNode

          }

        }, liveNode)

    const newLiveNodes = [
      ...memo.newLiveNodes,
      newLiveNode
    ]

    if (!liveNode) {

      return {
        newLiveNodes,
        multipliers: [
          ...memo.multipliers,
          {
            min: templateNode.order - 1,
            max: Infinity,
            rate: 1,
          }
        ]
      }

    } else

    if (newLiveNode.order > templateNode.order) {

      return {
        newLiveNodes,
        multipliers: [
          ...memo.multipliers,
          {
            min: -Infinity,
            max: newLiveNode.order,
            rate: 1,
          }
        ]
      }

    } else {

      return {
        newLiveNodes,
        multipliers: memo.multipliers,
      }

    }

  }, { multipliers: [], newLiveNodes: [] })

  return [ ...memo.newLiveNodes, ...liveNodes.slice(templateNodes.length) ]

}


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

const { times } = __webpack_require__(0)

const createNodes = ({
  offset = 0,
  limit = 0,
  liveNodes = [],
  templateNodes = [],
  domNodes = [],
  createNode,
  filterNodes = (liveNodes, templateNodes) => {
    return {
      filteredLiveNodes: liveNodes,
      filteredTemplateNodes: templateNodes
    }
  }
}) => {

  const { filteredLiveNodes, filteredTemplateNodes } = (
    filterNodes(liveNodes, templateNodes, { domNodes, offset })
  )

  const maxLength = Math.max(
    filteredLiveNodes.length,
    filteredTemplateNodes.length
  )

  return times(maxLength).reduce((patchNodes, index) => {

    const templateNode = filteredTemplateNodes[index] || null
    const liveNode = filteredLiveNodes[index] || null
    const domNode = liveNode && liveNode.dom || null

    const prevPatchNode = patchNodes[patchNodes.length - 1]

    const lastLimit =
      prevPatchNode && prevPatchNode.nextLimit
        ? prevPatchNode.nextLimit
        : limit

    const patchNode =
      createNode({
        index,
        limit: lastLimit,
        offset,
        liveNode,
        templateNode,
      })

    const liveChilds = (
      patchNode.liveNode && patchNode.liveNode.childs || null
    )

    const templateChilds = (
      patchNode.templateNode && patchNode.templateNode.childs || null
    )

    const domChilds = (
      domNode && domNode.childNodes || null
    )

    const childs =
      createNodes({
        offset: 0,
        limit: liveChilds ? liveChilds.length : 0,
        liveNodes: liveChilds || [],
        templateNodes: templateChilds || [],
        createNode,
        filterNodes,
        domNodes: domChilds
      })

    return [ ...patchNodes, Object.assign({}, patchNode, { childs }) ]

  }, [])

}

module.exports = createNodes


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

const { intersect } = __webpack_require__(0)
const countActionsScore = __webpack_require__(76)
const getNodeActions = __webpack_require__(77)
const { DELETE_NODE, REPLACE_NODE } = __webpack_require__(4)

module.exports = ({ liveNode, templateNode, limit }) => {

  const actions = getNodeActions({ liveNode, templateNode })

  const actionsScore = countActionsScore(actions)

  const nextLimit = limit + actionsScore

  const newLiveNode =
    intersect(actions, [ DELETE_NODE, REPLACE_NODE ]).length
      ? Object.assign({}, liveNode, { childs: [] })
      : liveNode

  const newTemplateNode =
    intersect(actions, [ DELETE_NODE ]).length
      ? Object.assign({}, templateNode, { childs: [] })
      : templateNode

  return {
    liveNode: newLiveNode,
    templateNode: newTemplateNode,
    limit,
    actions,
    nextLimit,
  }

}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

const { CREATE_NODE, DELETE_NODE } = __webpack_require__(4)

module.exports = (actions) => {

  return actions.reduce((score, action) => {

    switch (action) {

      case CREATE_NODE: {

        return score + 1

      }

      case DELETE_NODE: {

        return score - 1

      }

      default: {

        return score

      }

    }

  }, 0)

}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

const {
  INSERT_NODE, CREATE_NODE, UPDATE_NODE, REPLACE_NODE, DELETE_NODE
} = __webpack_require__(4)

const { TAG_TYPE, TEXT_TYPE } = __webpack_require__(1)

const actions = [
  {
    name: INSERT_NODE,
    check: ({ liveNode, templateNode }) => {
      return (
        liveNode && templateNode &&
        liveNode.order != templateNode.order
      )
    },
  },
  {
    name: CREATE_NODE,
    check: ({ liveNode, templateNode }) => {
      return (
        !liveNode &&
        templateNode
      )
    }
  },
  {
    name: UPDATE_NODE,
    check: ({ liveNode, templateNode }) => {

      return (
        liveNode &&
        templateNode &&
        (
          liveNode.type == TAG_TYPE &&
          templateNode.type == TAG_TYPE &&
          liveNode.tag == templateNode.tag
          ||
          liveNode.type == TEXT_TYPE &&
          templateNode.type == TEXT_TYPE &&
          liveNode.text != templateNode.text
        )
      )
    }
  },
  {
    name: REPLACE_NODE,
    check: ({ liveNode, templateNode }) => {
      return (
        liveNode &&
        templateNode &&
        (
          liveNode.type != templateNode.type
          ||
          liveNode.type == TAG_TYPE &&
          templateNode.type == TAG_TYPE &&
          liveNode.tag != templateNode.tag
        )
      )
    }
  },
  {
    name: DELETE_NODE,
    check: ({ liveNode, templateNode }) => {
      return (
        liveNode &&
        !templateNode
      ) ? {} : false
    }
  },
]

module.exports = ({ liveNode, templateNode }) => {

  return actions.reduce((names, action) => {

    return action.check({ templateNode, liveNode })
      ? [ ...names, action.name ]
      : names

  }, [])

}


/***/ }),
/* 78 */
/***/ (function(module, exports) {

const loop = (node, offsets, index = 0) => {

  if (index < offsets.length) {

    return loop(
      node.childNodes[offsets[index]],
      offsets,
      index + 1
    )

  } else {

    return node

  }

}

module.exports = loop


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

const { addRef, removeRef } = __webpack_require__(21)
const { createElement, insertAt, updateProps } = __webpack_require__(80)
const sortProps = __webpack_require__(28)
const isPropsEqual = __webpack_require__(82)
const {
  CREATE_NODE, UPDATE_NODE, DELETE_NODE, REPLACE_NODE, INSERT_NODE
} = __webpack_require__(4)
const { TEXT_TYPE } = __webpack_require__(1)

module.exports = ({
  actions,
  templateNode = null,
  liveNode = null,
  parentDomNode = null
}) => {

  if (actions.length == 0) return null

  const domNodes = actions.reduce((domNodes, action) => {

    switch (action) {

      case CREATE_NODE: {

        const newDom = createElement(templateNode)

        insertAt(newDom, parentDomNode, templateNode.order)

        if (templateNode.ref) {

          addRef(templateNode, newDom)

        }

        return [ ...domNodes, newDom ]

        break
      }

      case UPDATE_NODE: {

        if (liveNode.type == TEXT_TYPE) {

          liveNode.dom.nodeValue = templateNode.text

        } else {

          const liveInstanceId = (
            liveNode &&
            liveNode.instance &&
            liveNode.instance.node.instanceId
          )

          const templateInstanceId = (
            templateNode &&
            templateNode.instance &&
            templateNode.instance.node.instanceId
          )

          updateProps(
            liveNode.dom,
            liveNode.props,
            templateNode.props,
            (leftValue, rightValue, isFunctions) => {

              return (isFunctions && liveInstanceId != templateInstanceId)
                ? false
                : isPropsEqual(leftValue, rightValue)

            }
          )

          if (templateNode.ref) {

            addRef(templateNode, liveNode.dom)

          }

        }

        return [ ...domNodes, liveNode.dom ]

        break
      }

      case DELETE_NODE: {

        parentDomNode.removeChild(liveNode.dom)

        if (liveNode.ref) {

          removeRef(liveNode)

        }

        return domNodes

        break
      }

      case REPLACE_NODE: {

        const newDom = createElement(templateNode)

        if (templateNode.ref) {

          addRef(templateNode, newDom)

        } else

        if (liveNode.ref && !templateNode.ref) {

          removeRef(liveNode)

        }

        parentDomNode.replaceChild(newDom, liveNode.dom)

        return [ ...domNodes, newDom ]

        break
      }

      case INSERT_NODE: {

        insertAt(liveNode.dom, parentDomNode, templateNode.order)

        return [ ...domNodes, liveNode.dom ]

        break
      }

      default: {

        throw new Error('Unknown action type.')

      }

    }

  }, [])

  return domNodes[domNodes.length - 1] || null

}


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

const { TEXT_TYPE, TAG_TYPE } = __webpack_require__(1)
const sortProps = __webpack_require__(28)
const events = __webpack_require__(29)
const diffProps = __webpack_require__(81)

const updateProps = (domNode, liveProps, templateProps, isPropsEqual) => {

  const sortedLiveProps = sortProps(liveProps)
  const sortedTemplateProps = sortProps(templateProps)

  updateElementProps(
    domNode,
    sortedLiveProps.elementProps,
    sortedTemplateProps.elementProps,
    isPropsEqual
  )

  updateEventProps(
    domNode,
    sortedLiveProps.eventProps,
    sortedTemplateProps.eventProps,
    isPropsEqual
  )

}

const updateEventProps = (domNode, liveProps, templateProps, isPropsEqual) => {

  const { addProps, removeProps } =
    diffProps(
      liveProps,
      templateProps,
      isPropsEqual
    )

  removeProps.forEach(prop => removeEventProp(domNode, prop))
  addProps.forEach(prop => addEventProp(domNode, prop))

}

const updateElementProps = (domNode, liveProps, templateProps, isPropsEqual) => {

  const { addProps, removeProps } =
    diffProps(
      liveProps,
      templateProps,
      isPropsEqual
    )

  addProps.forEach((prop) => {

    const isPropsForAdd = (
      typeof prop.value == 'string' ||
      typeof prop.value == 'number' ||
      prop.value == true
    )

    if (isPropsForAdd) {

      const booleanProp = (prop.value === true) ? { value: '' } : {}

      const filteredProp = Object.assign({}, prop, booleanProp)

      addElementProp(domNode, filteredProp)

    } else {

      removeElementProp(domNode, prop)

    }

  })

  removeProps.forEach(prop => removeElementProp(domNode, prop))

}

const addElementProp = (domNode, prop) => {

  domNode.setAttribute(prop.key, prop.value)

}

const removeElementProp = (domNode, prop) => {

  domNode.removeAttribute(prop.key)

}

const addEventProp = (domNode, prop) => {

  domNode.addEventListener(events[prop.key], prop.value)

}

const removeEventProp = (domNode, prop) => {

  domNode.removeEventListener(events[prop.key], prop.value)

}

const createElement = (templateNode) => {

  switch (templateNode.type) {

    case TAG_TYPE: {

      const element = document.createElement(templateNode.tag)

      updateProps(element, {}, templateNode.props)

      return element
    }

    case TEXT_TYPE: {

      const element = document.createTextNode(templateNode.text)

      return element
    }

    default: {

      throw new Error('Unknown template node type:', templateNode.type)

    }

  }

}

const insertAt = (domNode, parentDomNode, order) => {

  const beforeDomNode =
    parentDomNode.childNodes[order]
      ? parentDomNode.childNodes[order]
      : parentDomNode.childNodes[parentDomNode.childNodes.length]

  parentDomNode.insertBefore(domNode, beforeDomNode)

}

module.exports = {
  updateProps,
  updateEventProps,
  updateElementProps,
  addElementProp,
  removeElementProp,
  addEventProp,
  removeEventProp,
  createElement,
  insertAt
}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

const { union } = __webpack_require__(0)

module.exports = (leftProps = {}, rightProps = {}, isPropsEqual) => {

  const keys = union(
    Object.keys(leftProps),
    Object.keys(rightProps)
  )

  return keys.reduce((sortedProps, key) => {

    if (leftProps.hasOwnProperty(key) && !rightProps.hasOwnProperty(key)) {

      return {
        addProps: sortedProps.addProps,
        removeProps: [
          ...sortedProps.removeProps,
          { key, value: leftProps[key] }
        ],
      }

    } else

    if (!leftProps.hasOwnProperty(key) && rightProps.hasOwnProperty(key)) {

      return {
        addProps: [
          ...sortedProps.addProps,
          { key, value: rightProps[key] }
        ],
        removeProps: sortedProps.removeProps,
      }

    } else {

      const isFunctions = (
        typeof leftProps[key] == 'function' &&
        typeof rightProps[key] == 'function'
      )

      const isEqual =
        isPropsEqual(
          leftProps[key],
          rightProps[key],
          isFunctions
        )

      if (!isEqual && isFunctions) {

        const addProps = [
          ...sortedProps.addProps,
          {
            key,
            value: rightProps[key]
          }
        ]

        const removeProps = [
          ...sortedProps.removeProps,
          {
            key,
            value: leftProps[key]
          }
        ]

        return { addProps, removeProps }

      } else

      if (!isEqual && !isFunctions) {

        const addProps = [
          ...sortedProps.addProps,
          {
            key,
            value: rightProps[key]
          }
        ]

        const removeProps = sortedProps.removeProps

        return { addProps, removeProps }

      } else {

        return sortedProps

      }

    }

  }, { addProps: [], removeProps: [] })

}


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

const { kindOf } = __webpack_require__(0)

module.exports = (leftProp, rightProp) => {

  const left = {
    prop: leftProp,
    type: kindOf(leftProp)
  }

  const right = {
    prop: rightProp,
    type: kindOf(rightProp)
  }

  if (left.type == right.type) {

    switch (left.type) {

      case 'function': {

        return false

        break
      }

      default: {

        return left.prop == right.prop

      }

    }

  } else {

    return false

  }


}


/***/ }),
/* 83 */
/***/ (function(module, exports) {

const updateNodes = ({ patchNodes, parentDomNode, updateDomNode }) => {

  patchNodes.forEach((patchNode) => {

    const updateParams = Object.assign({}, patchNode, { parentDomNode })

    const domNode = updateDomNode(updateParams)

    if (patchNode.childs.length > 0) {

      updateNodes({
        patchNodes: patchNode.childs,
        parentDomNode: domNode,
        updateDomNode
      })

    }

  })

  return parentDomNode

}

module.exports = updateNodes


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

const { TAG_TYPE, TEXT_TYPE } = __webpack_require__(1)
const tags = __webpack_require__(85)
const { flatten, include, omit } = __webpack_require__(0)

const h = (tag, props = {}, childs) => {

  const refParams = props.ref
    ? { ref: props.ref }
    : {}

  const keyParams = props.key
    ? { key: props.key }
    : {}

  const newProps = omit(props, 'ref', 'key')

  const baseParams = {
    tag,
    type: TAG_TYPE,
    props: newProps,
    childs
  }

  return Object.assign({}, baseParams, refParams, keyParams)


}

module.exports.h = h

tags.forEach((tag) => {

  module.exports[tag] = (props = {}, ...childs) => {

    return h(tag, props, childs)

  }

})


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = [
	"a",
	"abbr",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"base",
	"bdi",
	"bdo",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"div",
	"dl",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"keygen",
	"label",
	"legend",
	"li",
	"link",
	"main",
	"map",
	"mark",
	"math",
	"menu",
	"menuitem",
	"meta",
	"meter",
	"nav",
	"noscript",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"param",
	"picture",
	"pre",
	"progress",
	"q",
	"rb",
	"rp",
	"rt",
	"rtc",
	"ruby",
	"s",
	"samp",
	"script",
	"section",
	"select",
	"small",
	"source",
	"span",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"svg",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"title",
	"tr",
	"track",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
]


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

const { flatten } = __webpack_require__(0)
const { ROOT_TYPE, INSTANCE_TYPE } = __webpack_require__(1)
const createLiveTree = __webpack_require__(20)
const filterDomNodes = __webpack_require__(25)
const eachNodes = __webpack_require__(9)
const hookNode = __webpack_require__(2)
const { AFTER_DOM_CREATE } = __webpack_require__(3)
const createPatchTree = __webpack_require__(26)
const updateDomTree = __webpack_require__(27)
const dom2vqua = __webpack_require__(87)
const humanizeNodes = __webpack_require__(18)

module.exports = (parentDomNode, liveNodes, templateNodes, context = {}) => {

  const templateNodesWithRoot = [
    {
      type: ROOT_TYPE,
      dom: parentDomNode,
      childs: flatten([templateNodes]),
    }
  ]

  const newLiveNodes =
    createLiveTree(
      liveNodes,
      templateNodesWithRoot,
      {
        hooks: true,
        context,
      }
    )

  const templateDomNodes = filterDomNodes(newLiveNodes)

  const liveDomNodes = liveNodes.length == 0
    ? dom2vqua(parentDomNode.childNodes)
    : filterDomNodes(liveNodes)

  const patchNodes =
    createPatchTree({
      offset: 0,
      liveNodes: liveDomNodes,
      templateNodes: templateDomNodes,
      domNodes: Array.from(parentDomNode.childNodes),
    })

  updateDomTree({ patchNodes, parentDomNode })

  eachNodes(newLiveNodes, (liveNode) => {

    if (liveNode.type == INSTANCE_TYPE) {

      hookNode(AFTER_DOM_CREATE, liveNode, null, null)

    }

  })

  return newLiveNodes

}


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

const convertTag = __webpack_require__(88)
const convertText = __webpack_require__(89)
const mapNodes = __webpack_require__(90)

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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

const { TAG_TYPE } = __webpack_require__(1)

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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

const { TEXT_TYPE } = __webpack_require__(1)

module.exports = (node) => {

  return {
    type: TEXT_TYPE,
    text: node.textContent,
    dom: node,
  }

}


/***/ }),
/* 90 */
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

const { htmlQuotes } = __webpack_require__(30)
const { matchRoutes } = __webpack_require__(14)
const { include } = __webpack_require__(30)

class Navigation {

  constructor(routes) {

    this.routes = routes

    this.request = null

    this.response = null

    this.path = null

    this.onNavigateCallback =
      ({ path, statusCode, componentName, params }) => {}

    this.onRedirectCallback =
      ({ redirectPath, statusCode, params }) => {}

    this.isNeedNavigateCallback =
      (path, nextPath) => { return path != nextPath }

  }

  onNavigate(callback) {

    this.onNavigateCallback = callback

  }

  isNeedNavigate(callback) {

    this.isNeedNavigateCallback = callback

  }

  onRedirect(callback) {

    this.onRedirectCallback = callback

  }

  navigate(path, cache = false) {

    if (!this.isNeedNavigateCallback(path, this.path)) return false

    this.request = null

    this.response = null

    this.path = path

    return new Promise((resolve, reject) => {

      if (cache) {

        resolve(JSON.parse(cache))

      } else {

        this.handleAction(path, 0, (data) => {

          resolve(data)

        })

      }

    }).then((data) => {

      const params = Object.assign({}, data, { path })

      const redirectCodes = [ 301, 302, 303, 305, 307 ]

      if (include(redirectCodes, params.statusCode)) {

        this.onRedirectCallback(params)

      } else {

        this.onNavigateCallback(params)

      }

    })

  }

  handleAction(path, routeIndex, callback) {

    const availableRoutes = this.routes.slice(routeIndex)

    const route = matchRoutes(availableRoutes, path)

    const next = () => {

      this.handleAction(path, route.index + 1, callback)

    }

    if (!this.request) {

      this.request = Object.assign({}, route.request)

    }


    if (!this.response) {

      this.response = {
        send: (statusCode, componentName, params = {}) => {
          callback({ statusCode, componentName, params })
        },
        redirect: (statusCode, path, params = {}) => {
          callback({ statusCode, path, params })
        }
      }

    }

    route.action(this.request, this.response, next)

  }

}

module.exports = Navigation


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = (items, mapper, callback) => {

  if (items.length == 0) return callback(null, [])

  let counter = 0

  let results = []

  items.forEach((item, index) => {

    new Promise((resolve, reject) => {

      mapper(item, index, (error, result) => {

        if (error) {

          reject(error)

        } else {

          resolve(result)

        }

      })

    }).then((result) => {

      results[index] = result

      if (items.length == ++counter)
        callback(null, results)

    }).catch((error) => {

      callback(error, null)

    })

  })

}


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

const kindOf = __webpack_require__(12)
const include = __webpack_require__(13)

const clone = (argument) => {

  const argumentType = kindOf(argument)


  if (argumentType == 'object') {

    const object = argument

    const newObject = {}

    for (const key in object) {

      const value = object[key]

      const valueType = kindOf(value)

      if (include(['array','object'], valueType)) {

        newObject[key] = clone(value)

      } else {

        newObject[key] = value

      }

    }

    return newObject

  } else


  if (argumentType == 'array') {

    const array = argument

    const newArray = []

    for (const value of array) {

      const valueType = kindOf(value)

      if (include(['array','object'], valueType)) {

        newArray.push(clone(value))

      } else {

        newArray.push(value)

      }

    }

    return newArray


  } else {

    throw new Error('Cloned argument should be type of Array or Object.')

  }

}

module.exports = clone


/***/ }),
/* 94 */
/***/ (function(module, exports) {

const pick = (object, ...keys) => {
  const newObject = {}
  keys.forEach((key) => {
    if (key in object)
      newObject[key] = object[key]
  })
  return newObject
}

module.exports = pick


/***/ }),
/* 95 */
/***/ (function(module, exports) {

const omit = (object, ...keys) => {
  const newObject = {}
  Object.keys(object).forEach((key) => {
    if (keys.indexOf(key) == -1)
      newObject[key] = object[key]
  })
  return newObject

}

module.exports = omit


/***/ }),
/* 96 */
/***/ (function(module, exports) {

const union = (first, second) => {
  return first.concat(
    second.filter((key) => first.indexOf(key) == -1)
  )
}

module.exports = union


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = (string) => {

  return string.charAt(0).toLowerCase() + string.slice(1)

}


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

const flatten = __webpack_require__(31)
const kindOf = __webpack_require__(12)
const include = __webpack_require__(13)

module.exports = (...args) => {

  const unpackObjects = (args) => {

    return args.map((arg) => {

      const argType = kindOf(arg)

      if (argType == 'array') {

        return unpackObjects(arg)

      } else

      if (argType == 'object') {

        return Object.keys(arg).map((key) => {

          return arg[key] ? key : false

        })

      } else {

        return arg

      }

    })

  }

  return (
    flatten( unpackObjects(args) )
      .filter((arg) => {
        return include(['number', 'string'], typeof arg)
      })
      .join(' ')
  )

}


// const flattenNames = flatten(args)
//
// const objectNames = flattenNames.map((arg) => {
//
//   if(kindOf(arg) == 'object') {
//
//     Object.keys(arg).map((key) => {
//
//       if (arg[key]) {
//
//         return key
//
//       }
//
//       return false
//
//     })
//
//   }
//
//   return arg
//
// })
//
// const cleanedClassNames =
//
// return classNames..join(' ')


/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = (array) => {

  return array[0]

}


/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = (array) => {

  return array[array.length - 1]

}


/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = (left, right) => {

  if (!Array.isArray(left) || !Array.isArray(right)) return null

  return left.reduce((values, value) => {

    return right.indexOf(value) > -1
      ? [ ...values, value ]
      : values

  }, [])

}


/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = (count) => {

  return [...Array(count).keys()]

}


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = (items, match) => {

  const loop = (items, index) => {

    if (index == -1) return -1

    return match(items[index])
      ? index
      : loop(items, index - 1)
  }

  return loop(items, items.length - 1)

}


/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = (...methods) => {

  return (result) => {

    return methods.reduceRight((result, method) => {

      return method(result)

    }, result)

  }

}


/***/ }),
/* 106 */
/***/ (function(module, exports) {

const OPEN_QUOTE_SPECIAL = '&lt;'
const CLOSE_QUOTE_SPECIAL = '&gt;'

const OPEN_QUOTE_SIMPLE = '<'
const CLOSE_QUOTE_SIMPLE = '>'

const SPECIAL_TO_SIMPLE = {
  [OPEN_QUOTE_SPECIAL]:  OPEN_QUOTE_SIMPLE,
  [CLOSE_QUOTE_SPECIAL]: CLOSE_QUOTE_SIMPLE
}

const SIMPLE_TO_SPECIAL = {
  [OPEN_QUOTE_SIMPLE]:  OPEN_QUOTE_SPECIAL,
  [CLOSE_QUOTE_SIMPLE]: CLOSE_QUOTE_SPECIAL
}

const SIMPLE_QUOTES =
  new RegExp(OPEN_QUOTE_SIMPLE + '|' + CLOSE_QUOTE_SIMPLE, 'g')

const SPECIAL_QUOTES =
  new RegExp(OPEN_QUOTE_SPECIAL + '|' + CLOSE_QUOTE_SPECIAL, 'g')

const encode = (string) => (
  string.replace(SIMPLE_QUOTES, match => SIMPLE_TO_SPECIAL[match])
)

const decode = (string) => (
  string.replace(SPECIAL_QUOTES, match => SPECIAL_TO_SIMPLE[match])
)

module.exports = { encode, decode }


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = (items, index) => {

  if (index >= 0) {

    return items[index]

  } else {

    return items[items.length + index]

  }

}


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

const path2segments = __webpack_require__(32)

module.exports = (path, action, props = {}, childs = []) => {

  const segments = (typeof path == 'string')
    ? path2segments(path)
    : path

  return { path, action, segments, props, childs }

}


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

const matchSegments = __webpack_require__(110)
const path2segments = __webpack_require__(32)
const paramsFromSegments = __webpack_require__(111)
const filterPath = __webpack_require__(112)

module.exports = (routes, path) => {

  const filteredPath = filterPath(path)

  const segments = path2segments(filteredPath)

  const route = routes.find((route) => {

    return matchSegments(route.segments, segments)

  })

  if (!route) return false

  const params = paramsFromSegments(route.segments, segments)

  const request = {
    request: {
      path: filteredPath,
      segments,
      params
    }
  }

  return Object.assign({}, route, request)

}


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = (templateSegments, requestSegments) => {

  if (
    templateSegments.length == 1 &&
    templateSegments[0] == '*'
  ) return true

  if (templateSegments.length != requestSegments.length) return false

  return templateSegments.every((templateSegment, index) => {

    const requestSegment = requestSegments[index]

    if (typeof templateSegment == 'object') {

      return templateSegment.match(requestSegment)

    } else

    if (templateSegment[0] == ':') {

      return true

    } else

    if (templateSegment == requestSegment) {

      return true

    } else {

      return false

    }

  })

}


/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = (templateSegments, requestSegments) => {

  return templateSegments.reduce((params, templateSegment, index) => {

    const requestSegment = requestSegments[index]

    if (typeof templateSegment == 'object') {

      return Object.assign({}, params, {
        [templateSegment.key] : requestSegment
      })

    } else

    if (templateSegment[0] == ':') {

      return Object.assign({}, params, {
        [templateSegment.slice(1)] : requestSegment
      })

    }

    return params

  }, {})


}


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = (path = '') => {

  const afterHash = /#(.*)/

  return path.replace(afterHash, '')

}


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

const separateRoutes = __webpack_require__(114)
const indexRoutes = __webpack_require__(132)
const assignControllers = __webpack_require__(133)

module.exports = ({ routes, controllers = {} } = {}) => {

  const separatedRoutes = separateRoutes(routes)

  const indexedRoutes = indexRoutes(separatedRoutes)

  const actionedRoutes = assignControllers(indexedRoutes, controllers)

  return actionedRoutes

}


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

const { omit } = __webpack_require__(115)

const separateRoutes = (nestedRoutes, segments = []) => {

  if (Array.isArray(nestedRoutes)) {

    return nestedRoutes.reduce((separatedRoutes, nestedRoute, index) => {

      return [
        ...separatedRoutes,
        ...separateRoutes(nestedRoute, segments)
      ]

    }, [])

  } else {

    const nestedRoute = nestedRoutes

    const newSegments = [ ...segments, ...nestedRoute.segments ]

    const separatedRoute = Object.assign({},
      nestedRoute,
      { segments: newSegments }
    )

    return [
      omit(separatedRoute, 'childs'),
      ...separateRoutes(nestedRoute.childs, newSegments)
    ]

  }

}

module.exports = separateRoutes


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  asyncMap:       __webpack_require__(116),
  clone:          __webpack_require__(117),
  flatten:        __webpack_require__(33),
  include:        __webpack_require__(16),
  kindOf:         __webpack_require__(15),
  pick:           __webpack_require__(118),
  omit:           __webpack_require__(119),
  union:          __webpack_require__(120),
  capitalize:     __webpack_require__(121),
  uncapitalize:   __webpack_require__(122),
  classNames:     __webpack_require__(123),
  first:          __webpack_require__(124),
  last:           __webpack_require__(125),
  intersect:      __webpack_require__(126),
  times:          __webpack_require__(127),
  findRightIndex: __webpack_require__(128),
  compose:        __webpack_require__(129),
  htmlQuotes:     __webpack_require__(130),
  nth:            __webpack_require__(131),
}


/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = (items, mapper, callback) => {

  if (items.length == 0) return callback(null, [])

  let counter = 0

  let results = []

  items.forEach((item, index) => {

    new Promise((resolve, reject) => {

      mapper(item, index, (error, result) => {

        if (error) {

          reject(error)

        } else {

          resolve(result)

        }

      })

    }).then((result) => {

      results[index] = result

      if (items.length == ++counter)
        callback(null, results)

    }).catch((error) => {

      callback(error, null)

    })

  })

}


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

const kindOf = __webpack_require__(15)
const include = __webpack_require__(16)

const clone = (argument) => {

  const argumentType = kindOf(argument)


  if (argumentType == 'object') {

    const object = argument

    const newObject = {}

    for (const key in object) {

      const value = object[key]

      const valueType = kindOf(value)

      if (include(['array','object'], valueType)) {

        newObject[key] = clone(value)

      } else {

        newObject[key] = value

      }

    }

    return newObject

  } else


  if (argumentType == 'array') {

    const array = argument

    const newArray = []

    for (const value of array) {

      const valueType = kindOf(value)

      if (include(['array','object'], valueType)) {

        newArray.push(clone(value))

      } else {

        newArray.push(value)

      }

    }

    return newArray


  } else {

    throw new Error('Cloned argument should be type of Array or Object.')

  }

}

module.exports = clone


/***/ }),
/* 118 */
/***/ (function(module, exports) {

const pick = (object, ...keys) => {
  const newObject = {}
  keys.forEach((key) => {
    if (key in object)
      newObject[key] = object[key]
  })
  return newObject
}

module.exports = pick


/***/ }),
/* 119 */
/***/ (function(module, exports) {

const omit = (object, ...keys) => {
  const newObject = {}
  Object.keys(object).forEach((key) => {
    if (keys.indexOf(key) == -1)
      newObject[key] = object[key]
  })
  return newObject

}

module.exports = omit


/***/ }),
/* 120 */
/***/ (function(module, exports) {

const union = (first, second) => {
  return first.concat(
    second.filter((key) => first.indexOf(key) == -1)
  )
}

module.exports = union


/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = (string) => {

  return string.charAt(0).toLowerCase() + string.slice(1)

}


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

const flatten = __webpack_require__(33)
const kindOf = __webpack_require__(15)
const include = __webpack_require__(16)

module.exports = (...args) => {

  const unpackObjects = (args) => {

    return args.map((arg) => {

      const argType = kindOf(arg)

      if (argType == 'array') {

        return unpackObjects(arg)

      } else

      if (argType == 'object') {

        return Object.keys(arg).map((key) => {

          return arg[key] ? key : false

        })

      } else {

        return arg

      }

    })

  }

  return (
    flatten( unpackObjects(args) )
      .filter((arg) => {
        return include(['number', 'string'], typeof arg)
      })
      .join(' ')
  )

}


// const flattenNames = flatten(args)
//
// const objectNames = flattenNames.map((arg) => {
//
//   if(kindOf(arg) == 'object') {
//
//     Object.keys(arg).map((key) => {
//
//       if (arg[key]) {
//
//         return key
//
//       }
//
//       return false
//
//     })
//
//   }
//
//   return arg
//
// })
//
// const cleanedClassNames =
//
// return classNames..join(' ')


/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = (array) => {

  return array[0]

}


/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = (array) => {

  return array[array.length - 1]

}


/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = (left, right) => {

  if (!Array.isArray(left) || !Array.isArray(right)) return null

  return left.reduce((values, value) => {

    return right.indexOf(value) > -1
      ? [ ...values, value ]
      : values

  }, [])

}


/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = (count) => {

  return [...Array(count).keys()]

}


/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = (items, match) => {

  const loop = (items, index) => {

    if (index == -1) return -1

    return match(items[index])
      ? index
      : loop(items, index - 1)
  }

  return loop(items, items.length - 1)

}


/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = (...methods) => {

  return (result) => {

    return methods.reduceRight((result, method) => {

      return method(result)

    }, result)

  }

}


/***/ }),
/* 130 */
/***/ (function(module, exports) {

const OPEN_QUOTE_SPECIAL = '&lt;'
const CLOSE_QUOTE_SPECIAL = '&gt;'

const OPEN_QUOTE_SIMPLE = '<'
const CLOSE_QUOTE_SIMPLE = '>'

const SPECIAL_TO_SIMPLE = {
  [OPEN_QUOTE_SPECIAL]:  OPEN_QUOTE_SIMPLE,
  [CLOSE_QUOTE_SPECIAL]: CLOSE_QUOTE_SIMPLE
}

const SIMPLE_TO_SPECIAL = {
  [OPEN_QUOTE_SIMPLE]:  OPEN_QUOTE_SPECIAL,
  [CLOSE_QUOTE_SIMPLE]: CLOSE_QUOTE_SPECIAL
}

const SIMPLE_QUOTES =
  new RegExp(OPEN_QUOTE_SIMPLE + '|' + CLOSE_QUOTE_SIMPLE, 'g')

const SPECIAL_QUOTES =
  new RegExp(OPEN_QUOTE_SPECIAL + '|' + CLOSE_QUOTE_SPECIAL, 'g')

const encode = (string) => (
  string.replace(SIMPLE_QUOTES, match => SIMPLE_TO_SPECIAL[match])
)

const decode = (string) => (
  string.replace(SPECIAL_QUOTES, match => SPECIAL_TO_SIMPLE[match])
)

module.exports = { encode, decode }


/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = (items, index) => {

  if (index >= 0) {

    return items[index]

  } else {

    return items[items.length + index]

  }

}


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = (routes) => {

  return routes.map((route, index) => {

    return Object.assign({}, route, { index })

  })

}


/***/ }),
/* 133 */
/***/ (function(module, exports) {

const assignHandlers = (routes, controllers) => {

  return routes.map(route => {

    if (typeof route.action != 'string') return route

    const parsedAction = route.action.split('#')

    const controller = {
      name: parsedAction[0] + 'Controller',
      action: parsedAction[1]
    }

    return Object.assign({}, route, {
      controller: controllers[controller.name],
      action: controllers[controller.name][controller.action],
    })

  })

}

module.exports = assignHandlers


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

const routes = __webpack_require__(135)
const Controller = __webpack_require__(17)
const { initRoutes } = __webpack_require__(14)

module.exports = async function() {

  const controllers = await Controller.all()

  return initRoutes({ routes, controllers })

}


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

const { route } = __webpack_require__(14)

module.exports = [
  route('/', 'Welcome#index'),
]


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./WelcomeController.js": 34
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
webpackContext.id = 136;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Controller": 17,
	"./Controller.js": 17
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
webpackContext.id = 137;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./WelcomeContainer": 36,
	"./WelcomeContainer.js": 36
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
webpackContext.id = 138;

/***/ })
/******/ ]);