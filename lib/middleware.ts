import { IMiddleware } from 'koa-router'

export function Middleware (middleware: IMiddleware, name: string = middleware.name): MethodDecorator {
  return function MiddlewareDecorator (target, key) {
    const func = target[key]
    const middlewares: IMiddleware[] = func.middlewares || (func.middlewares = [])
    middlewares.push(middleware)
  }
}

export function createDecorator (middleware: IMiddleware): MethodDecorator {
  return Middleware(middleware)
}
