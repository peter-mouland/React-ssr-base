import React, { PropTypes } from 'react';


const Dashboard = ({ secretData, loading = false, ...props }) => (
  <section {...props} >
    <h2>Dashboard</h2>
    <p>You should get access to this page only after authentication.</p>
    {
      loading
        ? <p>Loading...</p>
        : <p style={{ fontSize: '16px', color: 'green' }}>{secretData}</p>
    }
  </section>
);

Dashboard.propTypes = {
  loading: PropTypes.bool,
  secretData: PropTypes.string
};

export default Dashboard;
