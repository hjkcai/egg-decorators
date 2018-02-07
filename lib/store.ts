import { Application } from 'egg'

let _app: Application | null = null

// Typically there is only one app instance in an egg application.
// So we use a store to make it easier to access.
// TODO: find out some way to support multiple applications
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
