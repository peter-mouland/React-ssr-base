import React, { PropTypes } from 'react';

import './loginForm.scss';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  actions
}) => (
    <form action="/" onSubmit={onSubmit} method="post" className="form">
      <h2>Login or Create and Account</h2>

      {successMessage && <p className="form__success">{successMessage}</p>}
      {errors.summary && <p className="form__error">{errors.summary}</p>}

      <div className="field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={onChange}
          value={user.email}
        />
        <p className="field__error">{errors.email}</p>
      </div>

      <div className="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
        <p className="field__error">{errors.password}</p>
      </div>

      <div className="field">
        <label><input
          type="radio"
          name="action"
          value={actions.login}
          defaultChecked={actions.default === actions.login}
          onChange={onChange}
        /> I am an existing User</label>
      </div>

      <div className="field">
        <label><input
          type="radio"
          name="action"
          value={actions.signUp}
          defaultChecked={actions.default === actions.signUp}
          onChange={onChange}
        /> I'm new here, please create an account!</label>
      </div>

      <button type="submit" className="form__action" >Log In</button>
    </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default LoginForm;
