import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import withSW from './sw/withSW';
var AppWithSW = withSW(App);
ReactDOM.render(React.createElement(AppWithSW, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map