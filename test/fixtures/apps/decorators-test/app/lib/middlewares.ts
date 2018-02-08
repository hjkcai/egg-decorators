import { createDecorator } from '../egg-decorators'

export const GlobalBody = createDecorator(async (ctx, next) => {
  ctx.body = {}
  await next()

  if (ctx.body && typeof ctx.body === 'object') {
    ctx.body.global = true
  }
})

export const PushItem = (n: number) => createDecorator(async (ctx, next) => {
  (ctx.body.items || (ctx.body.items = [])).push(n)
  return next()
})
