import React, { PropTypes } from 'react';
import Link from 'react-router-dom/Link';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
    <form action="/" onSubmit={onSubmit}>
      <h2>Login</h2>

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

      <button type="submit">Log In</button>

      <p>Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
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
