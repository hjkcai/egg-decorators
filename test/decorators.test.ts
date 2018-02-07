import { Application, Context } from 'egg'
import mock, { BaseMockApplication } from 'egg-mock'

describe('test/decorators.test.js', () => {
  let app: BaseMockApplication<Application, Context>

  before(() => {
    app = mock.app({ baseDir: 'apps/decorators-test' })
    return app.ready()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, decorators')
      .expect(200)
  })
})
