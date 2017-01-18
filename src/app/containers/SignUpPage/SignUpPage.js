import React from 'react';
import Redirect from 'react-router/Redirect';

import Auth from '../../modules/Auth';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import localStorage from '../../utils/local-storage';


class SignUpPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      redirect: false,
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();
    Auth.signUp(this.state.user, (errors, success) => {
      if (errors) {
        this.setState({ errors });
      } else {
        localStorage.setItem('successMessage', success.message);
        this.setState({ redirect: '/login' });
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
    const { redirect } = this.state;
    if (redirect) {
      return (<Redirect to={redirect}/>);
    }
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default SignUpPage;
