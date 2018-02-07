import { Context } from 'egg'

export type IMiddleware = (ctx: Context, next: () => Promise<any>) => any
export type ClassOrPropertyDecorator = (target: any, key?: string | symbol) => any

/** Insert a middleware into this route */
export function Middleware (middleware: IMiddleware): ClassOrPropertyDecorator {
  return function MiddlewareDecorator (target, key) {
    const func = key ? target[key] : target
    const middlewares: IMiddleware[] = func.middlewares || (func.middlewares = [])
    middlewares.push(middleware)
  }
}

/** Create a middleware decorator */
export const createDecorator = Middleware
