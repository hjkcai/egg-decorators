import { Controller } from 'egg'
import { Resource, Get } from '../egg-decorators'
import { GlobalBody, PushItem } from '../lib/middlewares'

@Resource('/another/resource', null)
@GlobalBody
export default class ResourceController extends Controller {
  async index () {
    this.ctx.body.handler = true
  }

  @PushItem(1)
  async show () {
    this.ctx.body.handler = true
    this.ctx.status = 201
  }

  @Get('/edit')
  @PushItem(1)
  async edit () {
    this.ctx.body.handler = true
  }
}
