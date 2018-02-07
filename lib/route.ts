import * as _ from 'lodash'
import { store } from './store'

const ROUTE_TABLE = Symbol('egg-decorator#routeTable')

type HttpMethod = 'get' | 'put' | 'post' | 'patch' | 'delete'

type RouteTable = RouteTableEntry[]
interface RouteTableEntry {
  method: HttpMethod,
  path: string | RegExp,
  middlewares: any[],
  name?: string
}

function generateRouteDecorator (method: HttpMethod) {
  return function RouteDecoratorFactory (path: string | RegExp, name?: string) {
    return function RouteDecorator (target: any, key: string) {
      const func = target[key]
      const { app } = store
      const routeTable: RouteTable = target[ROUTE_TABLE] || (target[ROUTE_TABLE] = [])
      const baseMiddleware = _.get(app, target.pathName)[key]

      routeTable.push({
        name,
        path,
        method,
        middlewares: (func.middlewares || []).concat([baseMiddleware])
      })
    }
  }
}

export function Router (target: any) {
  const { app } = store
  const routeTable: RouteTable = target.prototype[ROUTE_TABLE] || []

  app.beforeStart(() => {
    for (const entry of routeTable) {
      const args: any[] = [entry.path, ...entry.middlewares]
      if (entry.name) {
        args.unshift(entry.name)
      }

      // @ts-ignore
      app.router[entry.method](...args)
    }
  })
}

export const Get = generateRouteDecorator('get')
