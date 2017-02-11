import React, { PropTypes } from 'react';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  actions
}) => (
    <form action="/" onSubmit={onSubmit} method="post">
      <h2>Login or Create and Account</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={onChange}
          value={user.email}
        />
        <p className="error-text">{errors.email}</p>
      </div>

      <div className="field-line">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
        <p className="error-text">{errors.password}</p>
      </div>

      <div className="field-line">
        <label><input
          type="radio"
          name="action"
          value={actions.login}
          defaultChecked={actions.default === actions.login}
          onChange={onChange}
        /> I am an existing User</label>
      </div>

      <div className="field-line">
        <label><input
          type="radio"
          name="action"
          value={actions.signUp}
          defaultChecked={actions.default === actions.signUp}
          onChange={onChange}
        /> I'm new here, please create an account!</label>
      </div>

      <button type="submit" >Log In</button>
    </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
