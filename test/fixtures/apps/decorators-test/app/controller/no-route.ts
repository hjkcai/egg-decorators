import { Controller } from 'egg'
import { Get } from '../egg-decorators'

export default class BadController extends Controller {
  @Get('/bad')
  async badRoute () {
    this.ctx.body = 'noop'
  }
}
