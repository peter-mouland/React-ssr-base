import { React, mount, expect } from '../support/test.helper';
import Root, { Router } from '../../src/app/Root';
import Homepage from '../../src/app/containers/Homepage/Homepage';

describe('Client Render', function () {
  afterEach(() => {
    this.wrapper.unmount();
  });

  it('Should render the Homepage', () => {
    this.wrapper = mount(<Root location="/"/>);
    expect(this.wrapper.find(Homepage).length).to.equal(1);
  });

  describe('404', () => {
    it('should render the 404 route', () => {
      this.wrapper = mount(<Root location="/not-found"/>);
      expect(this.wrapper.find('#not-found').length).to.equal(1);
    });
  });

  describe('game', () => {
    it('should render the game page', () => {
      this.wrapper = mount(<Root location="/game/"/>);
      expect(this.wrapper.find('#game').length).to.equal(1);
    });
  });
});
