import React from 'react';
import PropTypes from 'prop-types';

import './loginForm.scss';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  actions
}) => (
    <form action="/nojs-login" onSubmit={onSubmit} method="post" className="form">
      <div className="bg" />
      <fieldset>
        <legend>Login or Create and Account</legend>


        {successMessage && <p className="form__success">{successMessage}</p>}
        {errors.summary && <p className="form__error">{errors.summary}</p>}

        <div className="field-group">
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={onChange}
            value={user.email}
          />
          <label htmlFor="email" className="animated-label">Email</label>
          <span className="separator"> </span>
          <p className="field__error">{errors.email}</p>
        </div>

        <div className="field-group">
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={onChange}
            value={user.password}
          />
          <label htmlFor="password" className="animated-label">Password</label>
          <span className="separator"> </span>
          <p className="field__error">{errors.password}</p>
        </div>

        <div className="field-group">
          <label><input
            type="radio"
            name="action"
            value={actions.login}
            defaultChecked={actions.default === actions.login}
            onChange={onChange}
          /> I am an existing User</label>
        </div>

        <div className="field-group">
          <label><input
            type="radio"
            name="action"
            value={actions.signUp}
            defaultChecked={actions.default === actions.signUp}
            onChange={onChange}
          /> This is my first time, I don't have a password!</label>
          <span className="separator"> </span>
        </div>

        <div className="field form__bottom">
          <input type="submit" className="form__action" value="Log In" />
        </div>
      </fieldset>
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
