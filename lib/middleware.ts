import { Context } from 'egg'

export type IMiddleware = (ctx: Context, next: () => Promise<any>) => Promise<any>

export function Middleware (middleware: IMiddleware, name: string = middleware.name): MethodDecorator | ClassDecorator {
  return function MiddlewareDecorator (target, key) {
    const func = key ? target[key] : target
    const middlewares: IMiddleware[] = func.middlewares || (func.middlewares = [])
    middlewares.push(middleware)
  }
}

export function createDecorator (middleware: IMiddleware): MethodDecorator | ClassDecorator {
  return Middleware(middleware)
}
