import { Controller } from 'egg'
import { GlobalBody, PushItem } from '../lib/middlewares'
import { Routes, Get, createDecorator } from '../egg-decorators'

@GlobalBody
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
