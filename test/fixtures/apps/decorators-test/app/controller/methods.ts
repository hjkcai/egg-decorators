import { Controller } from 'egg'
import { Routes, Get, Post, Put, Patch, Delete } from '../egg-decorators'

@Routes
export default class MethodsController extends Controller {
  @Get('/methods/test')
  async testGet () {
    this.ctx.body = 'get'
  }

  @Post('/methods/test')
  async testPost () {
    this.ctx.body = 'post'
  }

  @Put('/methods/test')
  async testPut () {
    this.ctx.body = 'put'
  }

  @Patch('/methods/test')
  async testPatch () {
    this.ctx.body = 'patch'
  }

  @Delete('/methods/test')
  async testDelete () {
    this.ctx.body = 'delete'
  }
}
