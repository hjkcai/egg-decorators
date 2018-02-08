import { Controller } from 'egg'
import { Resource } from '../egg-decorators'

@Resource
export default class ResourceController extends Controller {
  async index () {
    this.ctx.body = 'list resources'
  }

  async new () {
    this.ctx.body = 'new resource'
  }

  async show () {
    this.ctx.body = 'show resource'
  }

  async edit () {
    this.ctx.body = 'edit resource'
  }

  async create () {
    this.ctx.body = 'create resource'
  }

  async update () {
    this.ctx.body = 'update resource'
  }

  async destroy () {
    this.ctx.body = 'destroy resource'
  }
}
