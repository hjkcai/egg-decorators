import { Controller } from 'egg'
import { Router, Get } from '../egg-decorators'

@Router
export default class HomeController extends Controller {
  @Get('/')
  async index () {
    this.ctx.body = 'hi, ' + this.app.plugins.decorators.name
  }
}
