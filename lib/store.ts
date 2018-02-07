import { Application } from 'egg'

let _app: Application | null = null

export const store = {
  get app (): Application {
    if (!_app) {
      throw new Error('egg-decorator is not registered correctly. Please check config/plugin.js.')
    }

    return _app
  },
  set app (value: Application) {
    _app = value
  }
}
