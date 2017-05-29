import React from 'react';

import Auth from '../../auth-helper';

import '../../loginForm.scss';

class ChangePasswordPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
    };

    this.processForm = this.processForm.bind(this);
  }

  inputs = {};

  processForm(event) {
    event.preventDefault();
    Auth.updatePassword(this.inputs.password.value, (errors) => {
      const { location } = this.props;
      if (errors) {
        this.setState({ errors });
      } else if (location && location.state && location.state.from) {
        this.setState({ redirectToReferrer: location.state.from });
      } else {
        this.setState({ redirectToReferrer: '/', message: 'You have now updated your password' });
      }
    });
  }

  render() {
    const { errors, message } = this.state;
    return <form action="/nojs-save-password" onSubmit={this.processForm} method="post" className="form">
      <div className="bg"/>
      <fieldset>
        <legend>Update Your Password</legend>
        {errors.summary && <p className="form__error">{errors.summary}</p>}
        {message && <p className="form__success">{message}</p>}

        <p className="form__text">You are required to change your password.</p>
        <p className="form__text">Please ensure your new password has at least 8 characters.</p>

        <div className="field-group">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            ref={(input) => { this.inputs.password = input; }}
            defaultValue={''}
          />
          <label htmlFor="password" className="animated-label">New Password</label>
          <span className="separator"> </span>
          <p className="field__error">{errors.password}</p>
        </div>

        <div className="field form__bottom">
          <input type="submit" className="form__action" value="Update Password"/>
        </div>
      </fieldset>
    </form>;
  }
}

export default ChangePasswordPage;
