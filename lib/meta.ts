import { store } from './store'
import { Context } from 'egg'
import { RouteTable, ROUTE_TABLE } from './def'

/** A hash function to identify routes */
function generateMetaKey (method: string, path: string) {
  return `${method}${path}`
}

/** Inject metadata into routes */
export function Meta (obj: any): MethodDecorator {
  return function MetaDecorator (target, key) {
    // Use setImmediate to ensure other decorators are finished decorating
    setImmediate(() => {
      // Get the route table from @Method decorator
      const routeTable: RouteTable | undefined = target[ROUTE_TABLE]
      if (routeTable == null) return

      routeTable.filter(x => x.key === key).forEach(entry => {
        const metaKey = generateMetaKey(entry.method, entry.fullPath.toString())
        let meta: any
        if (store.meta.has(metaKey)) {
          meta = store.meta.get(metaKey)
        } else {
          meta = {}
          store.meta.set(metaKey, meta)
        }

        // Store the route-specified metadata.
        // Shallow merge if multiple @Meta decorators exist.
        Object.assign(meta, obj)
      })
    })
  }
}

// A route middleware for handling metadata.
// Note that this is not a standard egg middleware.
export function RouteMetaMiddleware (ctx: Context, next: any) {
  // Inject stored metadata into ctx.metadata
  const key = generateMetaKey(ctx.method.toLowerCase(), ctx._matchedRoute)
  ctx.metadata = store.meta.get(key) || {}

  return next()
}
