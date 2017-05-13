import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => <div>
  <p>Error Loading dashboard!</p>
  <p>{ error.name }</p>
  <p>{ error.message }</p>
  <p>{ error.stack }</p>
</div>;

const Dashboard = ({ secretData, error = false, loading = false, ...props }) => (
  <section {...props} >
    <h2>Dashboard</h2>
    <p>You should get access to this page only after authentication.</p>
    {error && <Error error={error} />}
    {
      loading
        ? <p>Loading...</p>
        : <p style={{ fontSize: '16px', color: 'green' }}>{secretData}</p>
    }
  </section>
);

Dashboard.propTypes = {
  loading: PropTypes.bool,
  secretData: PropTypes.string,
  error: PropTypes.object
};

export default Dashboard;
