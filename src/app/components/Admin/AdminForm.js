/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from 'react-bem-helper';

import Svg from '../Svg/Svg';
import football from '../../../assets/football.svg';

import './adminList.scss';

const bem = bemHelper({ name: 'admin-list' });

class AdminList extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
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

  getDefaultValue = () => `new ${this.props.type}`

  render() {
    const { loading = false } = this.props;
    return (loading ?
      <div { ...bem('text', 'saving') }><Svg markup={football} /> Saving...</div> :
      <form method="POST" onSubmit={ this.add }>
        <input { ...bem('text') }
               type="text"
               name="add"
               autoComplete="off"
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
    );
  }
}

export default AdminList;
