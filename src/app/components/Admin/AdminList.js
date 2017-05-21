/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from 'react-bem-helper';

import { SubLink } from '../../../app/routes';

import './adminList.scss';

const bem = bemHelper({ name: 'admin-list' });

export const join = (prefix, postfix) => `${prefix}/${postfix}`.replace(/\/\/\//g, '/').replace(/\/\//g, '/');

class AdminList extends React.Component {

  static propTypes = {
    list: PropTypes.array,
    secondary: PropTypes.bool,
    add: PropTypes.bool
  }

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();
  }

  render() {
    const { list, path, secondary = false, add = false, ...props } = this.props;
    const { router: { route: { match } } } = this.context;

    return (
      <ul { ...bem(null, { secondary }) } { ...props } >
        {
          list
            .map((item, i) => (
              <li { ...bem('item') } key={i}>
                <SubLink { ...bem('text') } to={join(match.url, `${path}/${item._id}/`)}>
                  {item.name}
                </SubLink>
              </li>
            ))
        }
        { add ? (
          <li { ...bem('item') }>
            <form method="POST" onSubmit={this.addItem}>
              <input { ...bem('text') }
                     type="text"
                     name="add"
                     defaultValue={`new ${path}` }
              />
              <input className="admin-btn"
                     type="submit"
                     value="Add"
              />
            </form>
          </li>
          ) : <li { ...bem('item') } /> }
      </ul>
    );
  }
}

export default AdminList;
