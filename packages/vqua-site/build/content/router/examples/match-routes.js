const { route, matchRoutes, separateRoutes } = require('vqua-router')

const routes = [
  route('/', 'main', {}, [
    route('/posts', 'all posts'),
    route('/posts/:id', 'post by id'),
  ]),
]

const separatedRoutes = separateRoutes(routes)

// separatedRoutes:
// [
//   route('/', 'main'),
//   route('/posts', 'all posts'),
//   route('/posts/:id', 'post by id'),
// ]

const matchedRoute = matchRoutes(separatedRoutes, '/posts/2')

// matchedRoute:
// {
//   path: '/posts/:id',
//   segments: ['posts', ':id'],
//   action: 'post by id',
//   props: {},
//   childs: [],
//   request: {
//     path: '/posts/2',
//     segments: ['posts', '2'],
//     params: { id: '2' },
//   }
// }
