module.exports = function EggDecoratorsBootstrap (application) {
  const { store } = require('./lib/store')
  store.app = application
}
