import { Controller } from 'egg'
import { Routes, Get, createDecorator } from '../egg-decorators'

const PushItem = (x: number) => createDecorator((ctx, next) => {
  ctx.body.items.push(x)
  return next()
})

const InitItem = createDecorator((ctx, next) => {
  ctx.body = { items: [] }
  return next()
})

@InitItem
@Routes
export default class BadController extends Controller {
  @PushItem(1)
  @Get('/mistakes/wrong-decorator-ordering')
  @PushItem(2)
  async wrongDecoratorOrdering () {
    this.ctx.body.handler = true
  }

  @Get('mistakes/missing-leading-slash')
  async missingLeadingSlash () {
    this.ctx.type = 'text'
    this.ctx.body = 'missing-leading-slash'
  }
}
