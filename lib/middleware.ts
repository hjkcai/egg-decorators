import { Context } from 'egg'

export type IMiddleware = (ctx: Context, next: () => Promise<any>) => any
export type ClassOrPropertyDecorator = (target: any, key?: string | symbol) => any

export function Middleware (middleware: IMiddleware, name: string = middleware.name): ClassOrPropertyDecorator {
  return function MiddlewareDecorator (target, key) {
    const func = key ? target[key] : target
    const middlewares: IMiddleware[] = func.middlewares || (func.middlewares = [])
    middlewares.push(middleware)
  }
}

export function createDecorator (middleware: IMiddleware): ClassOrPropertyDecorator {
  return Middleware(middleware)
}
