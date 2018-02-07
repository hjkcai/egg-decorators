import { Context } from 'egg'

export type IMiddleware = (ctx: Context, next: () => Promise<any>) => any
export type ClassOrPropertyDecorator = (target: any, key?: string | symbol) => any

/** Insert a middleware into this route */
export function Middleware (middleware: IMiddleware): ClassOrPropertyDecorator {
  return function MiddlewareDecorator (target, key) {
    const func = key ? target[key] : target
    const middlewares: IMiddleware[] = func.middlewares || (func.middlewares = [])

    /**
     * Ensure middlewares are executed from the top to the bottom.
     * Note that this is different from the execution order of the decorators.
     * Decorators executes from the bottom to the top.
     * However, when it comes to middlewares, it is very wired.
     *
     * For example, if we use the ordering of decorator directly:
     *
     * @Get('/')            // execution order
     * @Middleware1         // 3
     * @Middleware2         // 2
     * @Middleware3         // 1
     * async route () {}    // 4
     *
     * And semantically middlewares should be executed before the final handler.
     * So that is why it is ordered like this.
     */
    middlewares.unshift(middleware)
  }
}

/** Create a middleware decorator */
export const createDecorator = Middleware
