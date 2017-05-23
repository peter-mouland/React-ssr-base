import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ secretData, ...props }) => (
  <section {...props} >
    <h2>Dashboard</h2>
    <p>You should get access to this page only after authentication.</p>
    <p style={{ fontSize: '16px', color: 'green' }}>{secretData}</p>
  </section>
);

Dashboard.propTypes = {
  secretData: PropTypes.string,
};

export default Dashboard;
