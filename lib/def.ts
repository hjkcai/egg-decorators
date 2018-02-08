import { Context } from 'egg'

export const ROUTE_TABLE = Symbol('egg-decorator#routeTable')

export type HttpMethod = 'get' | 'put' | 'post' | 'patch' | 'delete'

export type RouteTable = Map<string | symbol, RouteTableEntry>
export interface RouteTableEntry {
  key: string,
  method: HttpMethod,
  path: string | RegExp,
  middlewares: any[],
  name?: string
}

export type IMiddleware = (ctx: Context, next: () => Promise<any>) => any
export type ClassOrPropertyDecorator = (target: any, key?: string | symbol) => any
