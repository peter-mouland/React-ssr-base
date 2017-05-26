import React from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';

import Auth from '../../auth-helper';
import LoginForm from '../../components/LoginForm/LoginForm';
import localStorage from '../../local-storage';

const actions = { signUp: 'signUp', login: 'login', default: 'login' };
const ReferrerMessage = ({ from }) => (
  <p className="message message--referrer">
    You must log in to view the page at
    <code>{from.pathname}</code>
  </p>
);

const getAndRemoveMessage = (key) => {
  const storedMessage = localStorage.getItem(key);
  let successMessage = '';

  if (storedMessage) {
    successMessage = storedMessage;
    localStorage.removeItem(key);
  }
  return successMessage;
};

class LoginPage extends React.Component {

  static propTypes = {
    location: PropTypes.object
  };

  static defaultProps = {
    location: { }
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      redirectToReferrer: false,
      successMessage: getAndRemoveMessage('successMessage'),
      user: {
        email: '',
        password: '',
        action: actions.default
      },
      loginAttemptCount: 0
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();
    const { user } = this.state;
    Auth[user.action](user, (errors) => {
      const { location } = this.props;
      const { loginAttemptCount } = this.state;
      if (errors) {
        this.setState({ errors, loginAttemptCount: loginAttemptCount + 1 });
      } else if (location.state && location.state.from) {
        this.setState({ redirectToReferrer: location.state.from, loginAttemptCount: 0 });
      } else {
        this.setState({ redirectToReferrer: '/', loginAttemptCount: 0 });
      }
    });
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({ user });
  }

  render() {
    const { from } = this.props.location.state || {};
    const { redirectToReferrer, errors, successMessage, user } = this.state;
    const redirect = redirectToReferrer ? (<Redirect to={from || '/'}/>) : null;
    const referrerMessage = from ? <ReferrerMessage from={from} /> : null;
    const form = (
      <div id="login-page">
        {referrerMessage}
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={errors}
          successMessage={successMessage}
          user={user}
          actions={actions}
        />
      </div>
    );

    return redirect || form;
  }
}

export default LoginPage;
