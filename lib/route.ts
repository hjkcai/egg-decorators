import * as _ from 'lodash'
import * as path from 'path'
import { store } from './store'
import { HttpMethod, RouteTable, ROUTE_TABLE } from './def'

/** Create decorators like @Get, @Post, etc. */
function generateRouteDecorator (method: HttpMethod) {
  return function RouteDecoratorFactory (path: string | RegExp, name?: string) {
    return function RouteDecorator (target: any, key: string) {
      // All routes will be stored in the route table
      // at class.prototype[ROUTE_TABLE]
      const routeTable: RouteTable = target[ROUTE_TABLE] || (target[ROUTE_TABLE] = [])

      // Inject an array at method.middlewares for easier middlewares' modification
      const middlewares = target[key].middlewares || (target[key].middlewares = [])

      routeTable.push({ key, name, path, method, middlewares })
    }
  }
}

/** Underlying implementation of @Routes */
function RoutesDecoratorFactory (prefix: string = '/'): ClassDecorator {
  return function RoutesDecorator (target: any) {
    const { app } = store
    const routeTable: RouteTable = target.prototype[ROUTE_TABLE] || []

    // Register all routes in the route table into the app before it starts
    app.beforeStart(() => {
      for (const entry of routeTable) {
        // Get the original middleware from egg
        const baseMiddleware = _.get(app, target.prototype.pathName)[entry.key]

        // Combine all middlewares from the route itself and the controller
        const localMiddlewares = entry.middlewares
        const commonMiddlewares = target.middlewares || []

        const args: any[] = [
          path.posix.join('/', prefix, entry.path),
          ...commonMiddlewares,
          ...localMiddlewares,
          baseMiddleware
        ]

        if (entry.name) {
          args.unshift(entry.name)
        }

        // @ts-ignore
        // Register route into the app
        app.router[entry.method](...args)
      }
    })
  }
}

export function Routes (target: Function): void
export function Routes (prefix: string): ClassDecorator
export function Routes (arg: any) {
  if (typeof arg === 'string') {
    return RoutesDecoratorFactory(arg)
  } else {
    RoutesDecoratorFactory()(arg)
  }
}

export const Get = generateRouteDecorator('get')
export const Post = generateRouteDecorator('post')
export const Put = generateRouteDecorator('put')
export const Patch = generateRouteDecorator('patch')
export const Delete = generateRouteDecorator('delete')
