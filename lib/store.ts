import { Application } from 'egg'

let _app: Application | null = null

export const store = {
  /**
   * Stores the egg application instance.
   *
   * Typically there is only one app instance in an egg application,
   * so we use a simple store to make it easier to access.
   * TODO: find out some way to support multiple applications
   */
  get app (): Application {
    if (!_app) {
      throw new Error('egg-decorator is not registered correctly. Please check config/plugin.js.')
    }

    return _app
  },
  set app (value: Application) {
    _app = value
  },

  /**
   * Stores all metadata of user routes.
   */
  meta: new Map<string, any>()
}
