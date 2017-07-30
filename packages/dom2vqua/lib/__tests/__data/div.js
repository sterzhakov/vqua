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
