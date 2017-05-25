/* eslint-disable no-underscore-dangle */
import React from 'react';

import './adminOptions.scss';

class ManagerAdminOptions extends React.Component {

  render() {
    const { children, ...props } = this.props;

    return (
      <div className="admin-options" { ...props }>
        <div className="admin-option">
          Managers :
        </div>

        <div className="admin-option">
          League:
        </div>

        <div className="admin-option admin-option__btn">
          { children }
        </div>
      </div>
    );
  }
}

export default ManagerAdminOptions;
