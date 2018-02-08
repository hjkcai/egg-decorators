import { Controller } from 'egg'
import { Resource, Get } from '../egg-decorators'

@Resource('/custom', 'Resource Pack')
export default class OhMyController extends Controller {
  async index () {
    this.ctx.body = 'list custom resources'
  }

  @Get('route')
  async custom () {
    this.ctx.body = 'custom route'
  }
}
