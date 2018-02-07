import { Controller } from 'egg'
import { Routes, Get } from '../egg-decorators'

@Routes('prefix/')
export default class PrefixedController extends Controller {
  @Get('/something')
  async prefixedRoute () {
    this.ctx.body = 'prefixed'
  }
}
