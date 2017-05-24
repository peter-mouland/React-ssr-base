/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import './adminOptions.scss';

class ManagerAdminOptions extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
  }

  render() {
    const { addManager, ...props } = this.props;

    return (
      <div className="admin-options" { ...props }>
        <div className="admin-option">
          Managers :
        </div>

        <div className="admin-option">
          League:
        </div>

        <div className="admin-option admin-option__btn">
          <form method="post" onSubmit={addManager}>
            <div>
              <label htmlFor="manager-name">Name:</label>
              <input id="manager-name" name="manager-name"/>
            </div>
            <div>
              <label htmlFor="manager-email">email:</label>
              <input id="manager-email" name="manager-email"/>
            </div>

            <input className="admin-btn" type="submit" value="Add Manager"/>
          </form>
        </div>
      </div>
    );
  }
}

export default ManagerAdminOptions;
