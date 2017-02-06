import React, { PropTypes } from 'react';
import Link from 'react-router-dom/Link';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
    <form action="/" onSubmit={onSubmit}>
      <h2 >Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <label>Name</label>
        <input
          name="name"
          type="text"
          onChange={onChange}
          value={user.name}
        />
        <p className="error-text">{errors.email}</p>
      </div>
      <div className="field-line">
        <label>Email</label>
        <input
          name="email"
          type="email"
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

      <div className="button-line">
        <button type="submit">Create New Account</button>
      </div>

      <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
    </form>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
