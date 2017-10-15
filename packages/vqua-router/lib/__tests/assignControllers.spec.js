const assignControllers = require('../assignControllers')

it('assignControllers()', () => {

  class PostsController { index() {} }

  class UsersController { show() {} }

  const postsController = new PostsController

  const usersController = new UsersController

  const controllers = {
    PostsController: postsController,
    UsersController: usersController
  }

  const routes = [
    { action: 'Posts#index' },
    { action: 'Users#show'  },
  ]

  expect(
    assignControllers(routes, controllers)
  ).toEqual([
    { action: postsController.index, controller: postsController },
    { action: usersController.show,  controller: usersController }
  ])

})
