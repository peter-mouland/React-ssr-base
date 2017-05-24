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
    loading: PropTypes.bool,
  }

  static contextTypes = {
    router: PropTypes.object
  }

  setDefaultValue = (e) => {
    if (e.currentTarget.value === '') {
      e.currentTarget.value = this.getDefaultValue();
    }
  }

  clearDefaultValue = (e) => {
    if (e.currentTarget.value === this.getDefaultValue()) {
      e.currentTarget.value = '';
    }
  }

  updateValue = (e) => {
    this.valueToAdd = e.currentTarget.value;
  }

  add = (e) => {
    e.preventDefault();
    if (this.valueToAdd) {
      this.input.value = this.getDefaultValue();
      this.props.add(this.valueToAdd);
    }
  }

  getDefaultValue = () => `new ${this.props.path}`

  render() {
    const { list, path, add, secondary = false, loading = false, ...props } = this.props;
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
        { add ? (
          <li { ...bem('item') }>
            { loading ?
              <div { ...bem('text', 'saving') }>Saving...</div> :
              <form method="POST" onSubmit={ this.add }>
                <input { ...bem('text') }
                       type="text"
                       name="add"
                       ref={(input) => { this.input = input; } }
                       defaultValue={ this.getDefaultValue() }
                       onFocus={ this.clearDefaultValue }
                       onBlur={ this.setDefaultValue }
                       onChange={ this.updateValue }
                />
                <input className="admin-btn"
                       type="submit"
                       value="Add"
                />
              </form>
            }
          </li>
        ) : <li { ...bem('item') } /> }
      </ul>
    );
  }
}

export default AdminList;
