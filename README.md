Easy-to-use decorators for writing controllers in egg.js.

## Features

* Define routes in together with the controller
* Per-route middleware via decorators
* Common middleware for a controller via decorators

## Quick glance

```typescript
import { Controller } from 'egg'
import { Resource, Post, createDecorator } from '../egg-decorators'

const users = [
  { id: 1, username: 'alice', password: '123' },
  { id: 2, username: 'bob', password: '456' }
]

// Set ctx.body to what is returned from next middleware
const ReturnBody = createDecorator(async (ctx, next) => {
  ctx.body = await next()
})

// Make sure only authorized user can access
const Authorized = (self: boolean) => createDecorator((ctx, next) => {
  if (ctx.headers.authorization) {
    ctx.user = ...
    if (!self || ctx.user.id == ctx.params.id) {
      return next()
    }
  }

  ctx.status = 401
  return 'Unauthorized'
})

@Resource                   // Auto prefix all routes with '/users' because the name of the controller is 'UserController', and do `router.resource` as egg.js is
@ReturnBody                 // This middleware will apply to all the routes of the controller
export default class UserController extends Controller {
  // GET /users
  async index () {
    this.ctx.body = users
  }

  // GET /users/:id
  @Authorized(false)        // This middleware will only apply to this route
  async show () {
    this.ctx.body = users.find(user => user.id == this.ctx.params.id)
  }

  // POST /users
  async create () {
    users.push(this.ctx.body)
    this.ctx.status = 204
  }

  // PATCH /users/:id
  @Authorized(true)
  async update () {
    this.ctx.body = 'update resource'
  }

  // POST /users/login
  @Post('/login')           // Remember that we have a common prefix on the controller
  async login () {
    this.ctx.body = 'destroy resource'
  }
}
```
