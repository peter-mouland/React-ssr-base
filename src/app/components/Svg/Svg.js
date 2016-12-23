import React, { PropTypes } from 'react';

export default class Svg extends React.Component {

  static propTypes = {
    markup: PropTypes.string.isRequired
  };

  render() {
    const { markup, className, ...props } = this.props;
    const isBase64 = typeof markup === 'string' && markup.indexOf('data') === 0;
    return isBase64
      ? <img src={markup} className={ className } {...props} />
      : <span dangerouslySetInnerHTML={{ __html: markup }} className={ className } {...props} />;
  }
}
