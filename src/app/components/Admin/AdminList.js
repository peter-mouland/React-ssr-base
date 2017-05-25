/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from 'react-bem-helper';

import { SubLink } from '../../../app/routes';

import './adminList.scss';

const bem = bemHelper({ name: 'admin-list' });

export const join = (prefix, path, id) => (
  `${prefix}/${path}/${id || ''}/`.replace(/\/\/\//g, '/').replace(/\/\//g, '/')
);

class AdminList extends React.Component {

  static propTypes = {
    list: PropTypes.array,
    secondary: PropTypes.bool,
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const { list, path, children, secondary = false, ...props } = this.props;
    const { router: { route: { match } } } = this.context;
    return (
      <ul { ...bem(null, { secondary }) } { ...props } >
        {
          list
            .map((item, i) => (
              <li { ...bem('item') } key={i}>
                <SubLink { ...bem('text') } to={join(match.url, path, item._id)}>
                  {item.name}
                </SubLink>
              </li>
            ))
        }
        <li { ...bem('item') }>
          { children }
        </li>
      </ul>
    );
  }
}

export default AdminList;
