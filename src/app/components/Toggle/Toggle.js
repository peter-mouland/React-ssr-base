import React from 'react';
import bemHelper from 'react-bem-helper';

import './toggle.scss';

const bem = bemHelper({ name: 'toggle' });

export default ({ id, checked, onChange, children, className, ...props }) => (
    <span className={className || ''}>
      <input { ...bem(null, 'ios') }
             id={ id }
             type="checkbox"
             defaultChecked={ checked }
             onChange={ onChange }
             { ...props }
      />
      <label { ...bem('label') } htmlFor={ id } >
        {children}
        <span { ...bem('btn') } />
      </label>
    </span>
  );
