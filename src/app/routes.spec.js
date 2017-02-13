import { expect } from '../../tests/support/test.helper';
import { getRoutesConfig } from './routes';

describe('routes', ()=>{
  const routes = getRoutesConfig();
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

  context('NamedLink', () => {
    it('should render with active classes if routes match exactly')

    it('should throw and error if the name doesnt match a known route')

  })

});
