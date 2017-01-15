import { expect } from '../../tests/support/test.helper';
import { routes } from './routes';

describe('routes', ()=>{
  it('should always start with /', () => {
    Object.keys(routes).forEach(route => {
      expect(routes[route].pattern.substr(0,1)).to.equal('/', 'route does not start with /')
    })
  });

  it('should always end with (/)? to allow both routes to work', () => {
    Object.keys(routes)
      .filter(route => routes[route].pattern !== '/')
      .forEach(route => {
      const pattern = routes[route].pattern;
      expect(pattern.substr(-4)).to.equal('(/)?', 'route does not end with (/)?')
    })
  });
});
