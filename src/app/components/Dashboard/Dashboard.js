import React from 'react';
import jwtDecode from 'jwt-decode';

import Auth from '../../authentication/auth-helper';
import Admin from '../../components/Admin/Admin';

const Dashboard = ({ ...props }) => {
  const token = jwtDecode(Auth.getToken());
  const isAdmin = token.isAdmin;

  return (
    <section {...props} >
      <h2>Dashboard</h2>
      {isAdmin && <Admin />}
    </section>
  );
};

export default Dashboard;
