import * as _ from 'lodash'
import * as path from 'path'
import { store } from './store'

const ROUTE_TABLE = Symbol('egg-decorator#routeTable')

type HttpMethod = 'get' | 'put' | 'post' | 'patch' | 'delete'

type RouteTable = RouteTableEntry[]
interface RouteTableEntry {
  key: string,
  method: HttpMethod,
  path: string | RegExp,
  middlewares: any[],
  name?: string
}

function generateRouteDecorator (method: HttpMethod) {
  return function RouteDecoratorFactory (path: string | RegExp, name?: string) {
    return function RouteDecorator (target: any, key: string) {
      // All routes will be stored in the route table
      // at class.prototype[ROUTE_TABLE]
      const routeTable: RouteTable = target[ROUTE_TABLE] || (target[ROUTE_TABLE] = [])

      // Inject an array at method.middlewares for easier middlewares' modification
      const middlewares = target[key].middlewares || (target[key].middlewares = [])

      if (routeTable.find(x => x.path === path && x.method === method)) {
        store.app.logger.warn('[egg-decorators]', 'route', method.toUpperCase(), path.toString(), 'is registered multiple times')
      }

      routeTable.push({ key, name, path, method, middlewares })
    }
  }
}

function RoutesDecoratorFactory (prefix: string = '/'): ClassDecorator {
  return function RoutesDecorator (target: any) {
    const { app } = store
    const routeTable: RouteTable = target.prototype[ROUTE_TABLE] || []

    app.beforeStart(() => {
      for (const entry of routeTable) {
        const baseMiddleware = _.get(app, target.prototype.pathName)[entry.key]
        const localMiddlewares = entry.middlewares.reverse()
        const commonMiddlewares = (target.middlewares || []).reverse()

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
