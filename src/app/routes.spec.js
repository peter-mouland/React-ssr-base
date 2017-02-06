import { expect } from '../../tests/support/test.helper';
import { routes } from './routes';

describe('routes', ()=>{
  it('should always start with /', () => {
    Object.keys(routes).forEach(route => {
      expect(routes[route].path.substr(0,1)).to.equal('/', 'route does not start with /')
    })
  });

  it('should always end with / to allow both routes to work', () => {
    Object.keys(routes)
      .forEach(route => {
      const pattern = routes[route].path;
      expect(pattern.substr(-1)).to.equal('/', 'route does not end with /')
    })
  });
});
