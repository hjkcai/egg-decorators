import { Controller } from 'egg'
import { GlobalBody, PushItem } from '../lib/middlewares'
import { Get, Routes, Middleware, createDecorator } from '../egg-decorators'

const Custom = createDecorator(async (ctx, next) => {
  ctx.body.custom = true
  return next()
})

@Routes
@GlobalBody
export default class MiddlewaresController extends Controller {
  @Get('/middlewares/global')
  async globalMiddleware () {
    this.ctx.body.handler = true
  }

  @Get('/middlewares/local')
  @Middleware(async (ctx, next) => {
    ctx.body.local = true
    return next()
  })
  async localMiddleware () {
    this.ctx.body.handler = true
  }

  @Get('/middlewares/multi')
  @Middleware(async (ctx, next) => {
    ctx.body.local = true
    return next()
  })
  @Middleware(async (ctx, next) => {
    await next()
    ctx.body.multi = true
  })
  async multiMiddleware () {
    this.ctx.body.handler = true
  }

  @Get('/middlewares/custom')
  @Middleware(async (ctx, next) => {
    ctx.body.local = true
    return next()
  })
  @Custom
  @Middleware(async (ctx, next) => {
    await next()
    ctx.body.multi = true
  })
  async customMiddleware () {
    this.ctx.body.handler = true
  }

  @Get('/middlewares/order')
  @PushItem(1)
  @PushItem(2)
  @PushItem(3)
  @PushItem(4)
  @PushItem(5)
  async orderMiddleware () {
    this.ctx.body.handler = true
  }
}
