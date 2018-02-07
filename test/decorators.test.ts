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

  describe('basic http method decorators', () => {
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      it(`${method.toUpperCase()} /methods/test`, () => {
        app.mockCsrf()
        return app.httpRequest()
          [method]('/methods/test')
          .expect(method)
          .expect(200)
      })
    }
  })

  describe('common mistakes', () => {
    it('should not register any routes when missing @Routes', () => {
      return app.httpRequest()
        .get('/bad')
        .expect(404)
    })
  })
})
