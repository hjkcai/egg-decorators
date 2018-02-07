import { Context } from 'egg'

export type IMiddleware = (ctx: Context, next: () => Promise<any>) => any
export type IDecorator = (target: any, key?: string | symbol) => any

export function Middleware (middleware: IMiddleware, name: string = middleware.name): IDecorator {
  return function MiddlewareDecorator (target, key) {
    const func = key ? target[key] : target
    const middlewares: IMiddleware[] = func.middlewares || (func.middlewares = [])
    middlewares.push(middleware)
  }
}

export function createDecorator (middleware: IMiddleware): IDecorator {
  return Middleware(middleware)
}
