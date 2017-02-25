import { expect, sinon, mount, render, React } from '../../../../../tests/config/test.helper';

import LogOut from './LogOut';
import Auth from '../../auth-helper';

const sandbox = sinon.sandbox.create();

const fakeLogout = sandbox.stub(Auth, 'logout');

describe('LogOut', () => {
  it('call auth.logout on mount', () => {
    mount(<LogOut />);
    expect(fakeLogout).to.be.calledWith();
  });
});
