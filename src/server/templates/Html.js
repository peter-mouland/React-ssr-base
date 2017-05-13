import React from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import { hasWindow } from '../../app/utils';

export default class Html extends React.Component {
  static propTypes = {
    initialState: PropTypes.object,
    content: PropTypes.node,
    script: PropTypes.string,
    stylesheet: PropTypes.string
  };

  render() {
    const { initialState, scripts, stylesheets, markup } = this.props;
    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {hasWindow ? null : DocumentMeta.renderAsReact()}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        {stylesheets.map((stylesheet, i) => <link href={stylesheet} rel="stylesheet" key={ i } />)}
      </head>
      <body>
      <script dangerouslySetInnerHTML={{
        __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`
      }} />
      <div id="html" dangerouslySetInnerHTML={{ __html: markup }} />
      {scripts.map((script, i) => <script src={script} key={ i } />)}
      {/* recommend `google-analytics-debugger` chrome extension for debugging */}
      <script async src="https://www.google-analytics.com/analytics.js"></script>
      </body>
      </html>
    );
  }
}
