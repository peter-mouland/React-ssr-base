import { React, mount, expect } from '../config/test.helper';
import Root, { Router } from '../../src/app/Root';
import Homepage from '../../src/app/containers/Homepage/Homepage';
import NotFound from '../../src/app/containers/NotFound/NotFound';
import Players from '../../src/app/containers/MyTeam/Players';

describe.only('Client Render', function () {
  afterEach(() => {
    this.wrapper.unmount();
  });

  it('Should render the Homepage', () => {
    this.wrapper = mount(<Root location="/"/>);
    expect(this.wrapper.find(Homepage).length).to.equal(1);
  });

  describe('404', () => {
    it('should render the 404 route', () => {
      this.wrapper = mount(<Root location="/not-found/"/>);
      expect(this.wrapper.find(NotFound).length).to.equal(1);
      expect(this.wrapper.find('#not-found').length).to.equal(1);
    });
  });

  describe('game', () => {
    it('should render the players page', () => {
      this.wrapper = mount(<Root location="/players/"/>);
      expect(this.wrapper.find(Players).length).to.equal(1);
      expect(this.wrapper.find('#players').length).to.equal(1);
    });
  });
});
