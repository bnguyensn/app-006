import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import withSW from './sw/withSW';

const AppWithSW = withSW(App);

ReactDOM.render(
  <AppWithSW/>, document.getElementById('root'),
);
