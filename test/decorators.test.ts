import { Application, Context } from 'egg'
import mock, { BaseMockApplication } from 'egg-mock'

describe('egg-decorators', () => {
  let app: BaseMockApplication<Application, Context>

  before(() => {
    app = mock.app({ baseDir: 'apps/decorators-test' })
    return app.ready()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('can prefix a controller via @Routes(prefix)', () => {
    return app.httpRequest()
      .get('/prefix/something')
      .expect('prefixed')
      .expect(200)
  })

  describe('basic http method decorators', () => {
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      it(`${method.toUpperCase()} /methods/test`, () => {
        app.mockCsrf()
        return app.httpRequest()[method]('/methods/test')
          .expect(method)
          .expect(200)
      })
    }
  })

  describe('middlewares', () => {
    it('global middlewares', () => {
      return app.httpRequest()
        .get('/middlewares/global')
        .expect({
          global: true,
          handler: true
        })
    })

    it('local middlewares', () => {
      return app.httpRequest()
        .get('/middlewares/local')
        .expect({
          global: true,
          handler: true,
          local: true
        })
    })

    it('multiple local middlewares', () => {
      return app.httpRequest()
        .get('/middlewares/multi')
        .expect({
          global: true,
          handler: true,
          local: true,
          multi: true
        })
    })

    it('custom decorator as middlewares', () => {
      return app.httpRequest()
        .get('/middlewares/custom')
        .expect({
          global: true,
          handler: true,
          local: true,
          multi: true,
          custom: true
        })
    })

    it('should have correct middleware ordering', () => {
      return app.httpRequest()
        .get('/middlewares/order')
        .expect({
          global: true,
          handler: true,
          ordering: [1, 2, 3, 4, 5]
        })
    })
  })

  describe('common mistakes', () => {
    it('should not register any routes when missing @Routes', () => {
      return app.httpRequest()
        .get('/bad')
        .expect(404)
    })
  })
})
