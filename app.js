module.exports = function EggDecoratorsBootstrap (application) {
  require('./lib/store').app = application
}
