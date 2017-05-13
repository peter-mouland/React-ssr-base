import React from 'react';
import bemHelper from 'react-bem-helper';
// import { Link } from 'react-router';

import './positions.scss';

const bem = bemHelper({ name: 'positions' });
export const availablePositions = ['unknown', 'GK', 'FB', 'CB', 'WM', 'CM', 'STR', 'park'];

export const PositionLinks = ({ selectedPos, onClick, className, ...props }) => {
  const positionLink = (pos) => {
    const selected = selectedPos === pos;
    return (
      <a href={'#'} { ...bem('link', { selected }) } key={pos} onClick={(e) => onClick(e, pos)}>
        {pos}
      </a>
    );
  };
  return (
    <span { ...bem('links', null, className) } { ...props }>
      {availablePositions.map(positionLink)}
    </span>
  );
};

export const PositionButtons = ({ selectedPos, onClick, className, ...props }) => {
  const positionButton = (pos) => {
    const selected = selectedPos === pos;
    return (
      <button { ...bem('button', { selected }) }
              key={pos} onClick={(e) => onClick(e, pos)}
      >
        {pos}
      </button>
    );
  };
  return (
    <span { ...bem('buttons', null, ['clearfix', className]) } { ...props }>
      {availablePositions.map(positionButton)}
    </span>
  );
};
