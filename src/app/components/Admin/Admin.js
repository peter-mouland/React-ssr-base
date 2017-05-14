import React from 'react';
import jwtDecode from 'jwt-decode';

import Auth from '../../authentication/auth-helper';

const Admin = ({ ...props }) => {
  const token = jwtDecode(Auth.getToken());
  const isAdmin = token.isAdmin;

  if (!isAdmin) return <p>No Access</p>;

  return (

    <section {...props} className="admin">
      <h3>Admin Actions</h3>
      <ul>
        <li>Create/Edit Season</li>
        <li>Create/Edit League</li>
        <li>Assign Manager to League</li>
        <li>Authorise Transfers</li>
        <li>Increment Game Week</li>
      </ul>
      <section className="admin__season">
        <h4>Create/Edit Season</h4>
        <form method="post" name="admin-season">
          <input type="text" name="new-season" /> +
        </form>
      </section>
      <section className="admin__league">
        <h4>Create/Edit League</h4>
        <form method="post" name="admin-league">
          <input type="text" name="new-league" /> +
        </form>
      </section>
      <section className="admin__assign-to-league">
        <h4>Assign Manager to League</h4>
        <form method="post" name="admin-managers">
          <h5>League 1</h5>
          <select name="managers-league-1" multiple></select>
          <h5>League 2</h5>
          <select name="managers-league-2" multiple></select>
        </form>
      </section>
      <section className="admin__transfers">
        <h4>Authorise Transfers</h4>
      </section>
      <section className="admin__game-week">
        <h4>Increment Game Week</h4>
        <p>Incrementing game week will save the current scores.</p>
        <p>This can only be done if there are NO outstanding transfers.</p>
        <p>Current Game Week: 32</p>
      </section>
    </section>
  );
};

export default Admin;
