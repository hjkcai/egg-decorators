import * as _ from 'lodash'
import { store } from './store'

function generateRouteDecorator (method: 'get' | 'put' | 'post' | 'patch' | 'delete' | 'del') {
  return function RouteDecoratorFactory (path: string | RegExp, routeName?: string) {
    return function RouteDecorator (target: any, key: string) {
      const func = target[key]
      func.routeName = routeName

      const { app } = store
      app.beforeStart(() => {
        const baseMiddleware = _.get(app, target.pathName)[key]
        if (baseMiddleware) {
          const additionalMiddlewares = func.middlewares || []
          const args: any[] = [path, ...additionalMiddlewares, baseMiddleware]

          if (routeName) {
            args.unshift(routeName)
          }

          // @ts-ignore
          app.router[method](...args)
        }
      })
    }
  }
}

export const Get = generateRouteDecorator('get')
