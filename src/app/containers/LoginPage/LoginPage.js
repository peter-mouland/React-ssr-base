import React from 'react';
import Redirect from 'react-router/Redirect';

import Auth from '../../modules/Auth';
import LoginForm from '../../components/LoginForm/LoginForm';
import localStorage from '../../utils/local-storage';

const ReferrerMessage = ({ from }) => (
  <p>
    You must log in to view the page at
    <code>{from.pathname}</code>
  </p>
);

class LoginPage extends React.Component {

  static propTypes = {
    location: React.PropTypes.object
  };

  static defaultProps = {
    location: { }
  };

  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      redirectToReferrer: false,
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();
    Auth.login(this.state.user, (errors) => {
      const { location } = this.props;
      if (errors) {
        this.setState({ errors });
      } else if (location.state && location.state.from) {
        this.setState({ redirectToReferrer: location.state.from });
      } else {
        this.setState({ redirectToReferrer: '/' });
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
    const { from } = this.props.location.state || '/';
    const { redirectToReferrer } = this.state;

    const redirect = redirectToReferrer ? (<Redirect to={from || '/'}/>) : null;
    const referrerMessage = from ? <ReferrerMessage from={from} /> : null;
    const form = (
      <div id="login-page">
        {referrerMessage}
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          successMessage={this.state.successMessage}
          user={this.state.user}
        />
      </div>
    );

    return redirect || form;
  }
}

export default LoginPage;
