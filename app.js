module.exports = function EggDecoratorsBootstrap (application) {
  const { store } = require('./lib/store')
  store.app = application

  const { RouteMetaMiddleware } = require('./lib/meta')
  application.router.use(RouteMetaMiddleware)
}
